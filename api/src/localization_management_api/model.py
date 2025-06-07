from typing import Dict

from pydantic import BaseModel, RootModel


class CreateProject(BaseModel):
    name: str


class CreateProjectLocale(BaseModel):
    locale: str


class CreateProjectKey(BaseModel):
    key: str


class CreateProjectTranslation(RootModel[Dict[str, str]]): ...
