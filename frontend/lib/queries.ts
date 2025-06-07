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
    onSuccess: async (_, { projectId }) =>
      await client.invalidateQueries({ queryKey: ["projects", projectId, "locales"] }),
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
    onSuccess: async (_, { projectId }) =>
      await client.invalidateQueries({ queryKey: ["projects", projectId, "keys"] }),
  });
}

export function useProjectLocaleTranslations(projectId: string, projectLocaleId: string) {
  return useQuery({
    queryKey: ["projects", projectId, "locales", projectLocaleId, "translations"],
    queryFn: fetchProjectLocaleTranslations.bind(null, projectLocaleId),
  });
}

export function useUpsertProjectLocaleTranslation() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: upsertProjectLocaleTranslation,
    onSuccess: async ({ projectId }, { projectLocaleId }) =>
      await client.invalidateQueries({
        queryKey: ["projects", projectId, "locales", projectLocaleId, "translations"],
      }),
  });
}
