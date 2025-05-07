import { z } from "zod";

export const zodAuthorDbSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  biography: z.string().min(10).nullable(),
  birth_date: z.coerce.date(),
  death_date: z.coerce.date().nullable(),
  nationality: z.string().min(3).nullable(),
  photo_url: z.string().url().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
});

export const zodAuthorSchema = zodAuthorDbSchema.transform((row) => ({
  id: row.id,
  name: row.name,
  biography: row.biography,
  birthDate: row.birth_date,
  deathDate: row.death_date,
  nationality: row.nationality,
  photoUrl: row.photo_url,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  deletedAt: row.deleted_at,
}));

export const zodAuthorSaveSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3),
  biography: z.string().min(10).nullable(),
  birthDate: z.coerce.date(),
  deathDate: z.coerce.date().nullable(),
  nationality: z.string().min(3).nullable(),
  photoUrl: z.string().url().nullable(),
});

export const zodAuthorIdParamSchema = z.object({
  id: z.string().uuid(),
});
