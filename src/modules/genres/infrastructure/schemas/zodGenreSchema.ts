import { z } from "zod";

export const zodGenreDbSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  description: z.string().min(10).nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
});

export const zodGenreSchema = zodGenreDbSchema.transform((row) => ({
  id: row.id,
  name: row.name,
  description: row.description,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  deletedAt: row.deleted_at,
}));

export const zodGenreSaveSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3),
  description: z.string().min(10).nullable(),
});

export const zodGenreIdParamSchema = z.object({
  id: z.string().uuid(),
});
