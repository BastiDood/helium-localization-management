from typing import Annotated

from fastapi import Depends, FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from supabase import AsyncClient, create_async_client

from .model import (
    CreateProject,
    CreateProjectKey,
    CreateProjectLocale,
    CreateProjectTranslation,
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


async def init_supabase_client():
    from .env import SUPABASE_URL, SUPABASE_KEY

    return await create_async_client(
        supabase_url=SUPABASE_URL,
        supabase_key=SUPABASE_KEY,
    )


@app.post("/api/projects")
async def create_project(
    project: CreateProject,
    supabase: Annotated[AsyncClient, Depends(init_supabase_client)],
):
    result = await supabase.table("project").insert({"name": project.name}).execute()
    first, *rest = result.data
    assert not rest
    return first


@app.get("/api/projects")
async def list_projects(
    supabase: Annotated[AsyncClient, Depends(init_supabase_client)],
):
    result = await supabase.table("project").select().execute()
    return result.data


@app.post("/api/projects/{id}/locales")
async def create_project_locale(
    locale: CreateProjectLocale,
    id: str,
    supabase: Annotated[AsyncClient, Depends(init_supabase_client)],
    response: Response,
):
    result = (
        await supabase.table("project_locale")
        .upsert(
            {
                "project_id": id,
                "locale": locale.locale,
            },
            on_conflict="project_id, locale",
            ignore_duplicates=True,
        )
        .execute()
    )

    if not result.data:
        response.status_code = 409
        return

    first, *rest = result.data
    assert not rest
    return first


@app.get("/api/projects/{id}/locales")
async def list_project_locales(
    id: str,
    supabase: Annotated[AsyncClient, Depends(init_supabase_client)],
):
    result = (
        await supabase.table("project_locale").select().eq("project_id", id).execute()
    )
    return result.data


@app.post("/api/projects/{id}/keys")
async def create_project_key(
    key: CreateProjectKey,
    id: str,
    supabase: Annotated[AsyncClient, Depends(init_supabase_client)],
    response: Response,
):
    result = (
        await supabase.table("project_key")
        .upsert(
            {
                "project_id": id,
                "key": key.key,
            },
            on_conflict="project_id, key",
            ignore_duplicates=True,
        )
        .execute()
    )

    if not result.data:
        response.status_code = 409
        return

    first, *rest = result.data
    assert not rest
    return first


@app.get("/api/projects/{id}/keys")
async def list_project_keys(
    id: str,
    supabase: Annotated[AsyncClient, Depends(init_supabase_client)],
):
    result = await supabase.table("project_key").select().eq("project_id", id).execute()
    return result.data


@app.post("/api/projects/{id}/locales/{locale}/translations")
async def bulk_upsert_project_translation(
    translations: CreateProjectTranslation,
    id: str,
    locale: str,
    supabase: Annotated[AsyncClient, Depends(init_supabase_client)],
):
    result = (
        await supabase.table("project_translation")
        .upsert(
            [
                {
                    "project_id": id,
                    "project_locale": locale,
                    "project_key": key,
                    "translation": translation,
                }
                for key, translation in translations.items()
            ],
            default_to_null=False,
        )
        .execute()
    )
    return result.data


@app.get("/api/projects/{id}/locales/{locale}/translations")
async def list_project_translations(
    id: str,
    locale: str,
    supabase: Annotated[AsyncClient, Depends(init_supabase_client)],
):
    result = (
        await supabase.table("project_translation")
        .select()
        .eq("project_id", id)
        .eq("project_locale", locale)
        .execute()
    )
    return result.data
