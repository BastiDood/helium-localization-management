import type { ZodType } from "zod/v4";

import { Project, ProjectKey, ProjectLocale, ProjectTranslation } from "./model";

async function get<S extends ZodType>(schema: S, path: string) {
  const url = new URL("http://localhost:8000");
  url.pathname = path;

  const response = await fetch(url, {
    method: "GET",
    credentials: "include",
  });

  // TODO: Handle errors.

  const json = await response.json();
  return schema.parse(json);
}

async function post<S extends ZodType>(schema: S, path: string, body?: BodyInit) {
  const url = new URL("http://localhost:8000");
  url.pathname = path;

  const response = await fetch(url, {
    method: "POST",
    body,
    headers: { Accept: "application/json" },
    credentials: "include",
  });

  // TODO: Handle errors.

  const json = await response.json();
  return schema.parse(json);
}

export async function createProject(project: Pick<Project, "name">) {
  return post(Project, "/api/projects", JSON.stringify(project));
}

const Projects = Project.array();
export async function fetchProjects() {
  return await get(Projects, "/api/projects");
}

export async function createProjectLocale({
  project_id,
  locale,
}: Pick<ProjectLocale, "project_id" | "locale">) {
  return post(
    ProjectLocale,
    `/api/projects/${project_id}/locales`,
    JSON.stringify({ locale }),
  );
}

const ProjectLocales = ProjectLocale.array();
export async function fetchProjectLocales(projectId: string) {
  return await get(ProjectLocales, `/api/projects/${projectId}/locales`);
}

export async function createProjectKey({ project_id, key }: Pick<ProjectKey, "project_id" | "key">) {
  return post(ProjectKey, `/api/projects/${project_id}/keys`, JSON.stringify({ key }));
}

const ProjectKeys = ProjectKey.array();
export async function fetchProjectKeys(id: string) {
  return await get(ProjectKeys, `/api/projects/${id}/keys`);
}

interface UpsertProjectLocaleTranslation extends Pick<ProjectTranslation, "project_id" | "project_locale"> {
  data: Record<ProjectTranslation["project_key"], ProjectTranslation["translation"]>;
}

const ProjectTranslations = ProjectTranslation.array();
export async function upsertProjectLocaleTranslation({
  project_id,
  project_locale,
  data,
}: UpsertProjectLocaleTranslation) {
  return await post(
    ProjectTranslations,
    `/api/projects/${project_id}/locales/${project_locale}/translations`,
    JSON.stringify(data),
  );
}

export async function fetchProjectLocaleTranslations(id: string, locale: string) {
  return await get(ProjectTranslations, `/api/projects/${id}/locales/${locale}/translations`);
}
