from typing import Annotated

from fastapi import Depends, FastAPI
from supabase import AsyncClient, create_async_client

app = FastAPI()

async def init_supabase_client():
  from .env import SUPABASE_URL, SUPABASE_KEY
  return await create_async_client(
    supabase_url=SUPABASE_URL,
    supabase_key=SUPABASE_KEY,
  )

@app.get("/localizations/{project_id}/{locale}")
async def get_localizations(
  project_id: str,
  locale: str,
  supabase: Annotated[AsyncClient, Depends(init_supabase_client)],
):
  return { "id": project_id, "locale": locale }
