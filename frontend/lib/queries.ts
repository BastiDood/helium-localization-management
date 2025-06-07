import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createProject,
  createProjectKey,
  createProjectLocale,
  fetchProjectKeys,
  fetchProjectLocales,
  fetchProjectLocaleTranslations,
  fetchProjects,
  upsertProjectLocaleTranslation,
} from "./api";

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}

export function useCreateProject() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: async () => await client.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useProjectLocales(projectId: string) {
  return useQuery({
    queryKey: ["projects", projectId, "locales"],
    queryFn: fetchProjectLocales.bind(null, projectId),
  });
}

export function useCreateProjectLocale() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createProjectLocale,
    onSuccess: async (_, { project_id }) =>
      await client.invalidateQueries({ queryKey: ["projects", project_id, "locales"] }),
  });
}

export function useProjectKeys(projectId: string) {
  return useQuery({
    queryKey: ["projects", projectId, "keys"],
    queryFn: fetchProjectKeys.bind(null, projectId),
  });
}

export function useCreateProjectKey() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: createProjectKey,
    onSuccess: async (_, { project_id }) =>
      await client.invalidateQueries({ queryKey: ["projects", project_id, "keys"] }),
  });
}

export function useProjectLocaleTranslations(id: string, locale: string) {
  return useQuery({
    queryKey: ["projects", id, "locales", locale, "translations"],
    queryFn: fetchProjectLocaleTranslations.bind(null, id, locale),
  });
}

export function useUpsertProjectLocaleTranslation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: upsertProjectLocaleTranslation,
    onSuccess: async (_, { project_id, project_locale }) =>
      await client.invalidateQueries({
        queryKey: ["projects", project_id, "locales", project_locale, "translations"],
      }),
  });
}
