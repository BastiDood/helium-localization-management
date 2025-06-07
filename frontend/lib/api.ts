import type { ZodType } from "zod/v4";

import { Project, ProjectKey, ProjectLocale, ProjectTranslation } from "./model";

async function get<S extends ZodType>(schema: S, path: string) {
  const url = new URL("https://localhost:8000");
  url.pathname = path;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    credentials: "include",
  });

  // TODO: Handle errors.

  const json = await response.json();
  return schema.parse(json);
}

async function post<S extends ZodType>(schema: S, path: string, body?: BodyInit) {
  const url = new URL("https://localhost:8000");
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

const ProjectCreated = Project.pick({ id: true });
export async function createProject(project: Pick<Project, "name">) {
  return post(ProjectCreated, "/api/projects", JSON.stringify(project));
}

const Projects = Project.array();
export async function fetchProjects() {
  return await get(Projects, "/api/projects");
}

const ProjectLocaleCreated = ProjectLocale.pick({ id: true });
export async function createProjectLocale({
  projectId,
  locale,
}: Pick<ProjectLocale, "projectId" | "locale">) {
  return post(
    ProjectLocaleCreated,
    `/api/projects/${projectId}/locales`,
    JSON.stringify({ locale }),
  );
}

const ProjectLocales = ProjectLocale.omit({ projectId: true }).array();
export async function fetchProjectLocales(projectId: string) {
  return await get(ProjectLocales, `/api/projects/${projectId}/locales`);
}

const ProjectKeyCreated = ProjectKey.pick({ id: true });
export async function createProjectKey({ projectId, key }: Pick<ProjectKey, "projectId" | "key">) {
  return post(ProjectKeyCreated, `/api/projects/${projectId}/keys`, JSON.stringify({ key }));
}

const ProjectKeys = ProjectKey.omit({ projectId: true }).array();
export async function fetchProjectKeys(projectId: string) {
  return await get(ProjectKeys, `/api/projects/${projectId}/keys`);
}

const ProjectTranslationUpserted = ProjectTranslation.pick({ id: true }).extend({
  projectId: Project.shape.id,
});
export async function upsertProjectLocaleTranslation({
  projectLocaleId,
  data,
}: {
  projectLocaleId: ProjectTranslation["projectLocaleId"];
  data: Record<ProjectTranslation["projectKeyId"], ProjectTranslation["translation"]>;
}) {
  return await post(
    ProjectTranslationUpserted,
    `/api/locales/${projectLocaleId}/translations`,
    JSON.stringify(data),
  );
}

const ProjectTranslations = ProjectTranslation.omit({ projectLocaleId: true }).array();
export async function fetchProjectLocaleTranslations(projectLocaleId: string) {
  return await get(ProjectTranslations, `/api/locales/${projectLocaleId}/translations`);
}
