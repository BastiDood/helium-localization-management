import { z } from "zod/v4";

export const Project = z.object({
  id: z.uuid(),
  name: z.string(),
  created_at: z.coerce.date(),
});
export type Project = z.infer<typeof Project>;

export const ProjectLocale = z.object({
  locale: z.string(),
  created_at: z.coerce.date(),
  project_id: Project.shape.id,
});
export type ProjectLocale = z.infer<typeof ProjectLocale>;

export const ProjectKey = z.object({
  project_id: Project.shape.id,
  key: z.string(),
  created_at: z.coerce.date(),
});
export type ProjectKey = z.infer<typeof ProjectKey>;

export const ProjectTranslation = z.object({
  project_id: Project.shape.id,
  project_key: ProjectKey.shape.key,
  project_locale: ProjectLocale.shape.locale,
  translation: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});
export type ProjectTranslation = z.infer<typeof ProjectTranslation>;
