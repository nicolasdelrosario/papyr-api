import { z } from "zod";

export const zodBookDbSchema = z.object({
  id: z.string().uuid(),
  author_id: z.string().uuid(),
  publisher_id: z.string().uuid(),
  title: z.string().min(2),
  description: z.string().min(10).nullable(),
  isbn: z.string().nullable(),
  publication_date: z.coerce.date(),
  cover_url: z.string().url().nullable(),
  pages: z.number().min(1),
  language: z.string().min(2),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
});

export const zodBookSchema = zodBookDbSchema.transform((row) => ({
  id: row.id,
  authorId: row.author_id,
  publisherId: row.publisher_id,
  title: row.title,
  description: row.description,
  isbn: row.isbn,
  publicationDate: row.publication_date,
  coverUrl: row.cover_url,
  pages: row.pages,
  language: row.language,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  deletedAt: row.deleted_at,
}));

export const zodBookSaveSchema = z.object({
  id: z.string().uuid().optional(),
  authorId: z.string().uuid(),
  publisherId: z.string().uuid(),
  title: z.string().min(2),
  description: z.string().min(10).nullable(),
  isbn: z.string().nullable(),
  publicationDate: z.coerce.date(),
  coverUrl: z.string().url().nullable(),
  pages: z.number().min(1),
  language: z.string().min(2),
});

export const zodBookIdParamSchema = z.object({
  id: z.string().uuid(),
});
