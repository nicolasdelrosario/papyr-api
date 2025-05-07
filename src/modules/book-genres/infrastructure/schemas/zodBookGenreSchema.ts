import { z } from "zod";

export const zodBookGenreDbSchema = z.object({
  id: z.string().uuid(),
  book_id: z.string().uuid(),
  genre_id: z.string().uuid(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
});

export const zodBookGenreSchema = zodBookGenreDbSchema.transform((row) => ({
  id: row.id,
  bookId: row.book_id,
  genreId: row.genre_id,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  deletedAt: row.deleted_at,
}));

export const zodBookGenreSaveSchema = z.object({
  id: z.string().uuid().optional(),
  bookId: z.string().uuid(),
  genreId: z.string().uuid(),
});

export const zodBookGenreIdParamSchema = z.object({
  id: z.string().uuid(),
});
