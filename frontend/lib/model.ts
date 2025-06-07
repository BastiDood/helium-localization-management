import { z } from "zod/v4";

export const Project = z.object({
  id: z.uuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
});
export type Project = z.infer<typeof Project>;

export const ProjectLocale = z.object({
  id: z.uuid(),
  locale: z.string(),
  createdAt: z.coerce.date(),
  projectId: Project.shape.id,
});
export type ProjectLocale = z.infer<typeof ProjectLocale>;

export const ProjectKey = z.object({
  id: z.uuid(),
  projectId: Project.shape.id,
  key: z.string(),
  createdAt: z.coerce.date(),
});
export type ProjectKey = z.infer<typeof ProjectKey>;

export const ProjectTranslation = z.object({
  id: z.uuid(),
  projectKeyId: ProjectKey.shape.id,
  projectLocaleId: ProjectLocale.shape.id,
  translation: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type ProjectTranslation = z.infer<typeof ProjectTranslation>;
