import { type ZodType, z } from "zod/v4";

import { API_ORIGIN } from "./env";
import { Project, ProjectKey, ProjectLocale, ProjectTranslation } from "./model";

async function get<S extends ZodType>(schema: S, path: string) {
  const url = new URL(API_ORIGIN);
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
  const url = new URL(API_ORIGIN);
  url.pathname = path;

  const response = await fetch(url, {
    method: "POST",
    body,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // TODO: Handle errors.

  const json = await response.json();
  return schema.parse(json);
}

export const CreateProjectInput = Project.pick({ name: true });
export async function createProject(project: z.infer<typeof CreateProjectInput>) {
  return await post(Project, "/api/projects", JSON.stringify(project));
}

const Projects = Project.array();
export async function fetchProjects() {
  return await get(Projects, "/api/projects");
}

export const CreateProjectLocaleInput = ProjectLocale.pick({ project_id: true, locale: true });
export async function createProjectLocale({
  project_id,
  locale,
}: z.infer<typeof CreateProjectLocaleInput>) {
  return await post(
    ProjectLocale,
    `/api/projects/${project_id}/locales`,
    JSON.stringify({ locale }),
  );
}

const ProjectLocales = ProjectLocale.array();
export async function fetchProjectLocales(projectId: string) {
  return await get(ProjectLocales, `/api/projects/${projectId}/locales`);
}

export const CreateProjectKeyInput = ProjectKey.pick({ project_id: true, key: true });
export async function createProjectKey({ project_id, key }: z.infer<typeof CreateProjectKeyInput>) {
  return await post(ProjectKey, `/api/projects/${project_id}/keys`, JSON.stringify({ key }));
}

const ProjectKeys = ProjectKey.array();
export async function fetchProjectKeys(id: string) {
  return await get(ProjectKeys, `/api/projects/${id}/keys`);
}

export const UpsertProjectLocaleTranslationInput = ProjectTranslation.pick({
  project_id: true,
  project_locale: true,
}).extend({
  data: z.record(ProjectTranslation.shape.project_key, ProjectTranslation.shape.translation),
});

const ProjectTranslations = ProjectTranslation.array();
export async function upsertProjectLocaleTranslation({
  project_id,
  project_locale,
  data,
}: z.infer<typeof UpsertProjectLocaleTranslationInput>) {
  return await post(
    ProjectTranslations,
    `/api/projects/${project_id}/locales/${project_locale}/translations`,
    JSON.stringify(data),
  );
}

export async function fetchProjectLocaleTranslations(id: string, locale: string) {
  return await get(ProjectTranslations, `/api/projects/${id}/locales/${locale}/translations`);
}
