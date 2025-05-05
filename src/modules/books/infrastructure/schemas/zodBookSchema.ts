import { z } from "zod";

export const zodBookSchema = z.object({
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

export const zodBookSaveSchema = zodBookSchema
  .extend({
    id: z.string().uuid().optional(),
  })
  .omit({
    created_at: true,
    updated_at: true,
    deleted_at: true,
  });

export const zodBookIdParamSchema = zodBookSchema.pick({
  id: true,
});

export type BookDTO = z.infer<typeof zodBookSchema>;
