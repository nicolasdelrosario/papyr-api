import { z } from "zod";

export const zodUserDbSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  avatar_url: z.string().url().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
});

export const zodUserSchema = zodUserDbSchema.transform((row) => ({
  id: row.id,
  name: row.name,
  username: row.username,
  email: row.email,
  password: row.password,
  avatarUrl: row.avatar_url,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  deletedAt: row.deleted_at,
}));

export const zodUserSaveSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  avatarUrl: z.string().url().nullable(),
});

export const zodUserIdParamSchema = z.object({
  id: z.string().uuid(),
});
