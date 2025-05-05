import { z } from "zod";

export const zodBookSchema = z.object({
  id: z.string().uuid(),
  authorId: z.string().uuid(),
  publisherId: z.string().uuid(),
  title: z.string().min(2),
  description: z.string().min(10).nullable(),
  isbn: z.string().nullable(),
  publicationDate: z.coerce.date(),
  coverUrl: z.string().url().nullable(),
  pages: z.number().min(1),
  language: z.string().min(2),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});

export const zodBookSaveSchema = zodBookSchema
  .extend({
    id: z.string().uuid().optional(),
  })
  .omit({
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  });

export const zodBookIdParamSchema = zodBookSchema.pick({
  id: true,
});

export type BookDTO = z.infer<typeof zodBookSchema>;
