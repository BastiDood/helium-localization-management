from typing import Dict

from pydantic import BaseModel


class CreateProject(BaseModel):
    name: str


class CreateProjectLocale(BaseModel):
    locale: str


class CreateProjectKey(BaseModel):
    key: str


CreateProjectTranslation = Dict[str, str]
