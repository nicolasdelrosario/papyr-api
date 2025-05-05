import { z } from "zod";

export const genreSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  description: z.string().min(10).nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
});

export const genreSaveSchema = genreSchema
  .extend({
    id: z.string().uuid().optional(),
  })
  .omit({
    created_at: true,
    updated_at: true,
    deleted_at: true,
  });

export const genreIdParamSchema = genreSchema.pick({
  id: true,
});

export type GenreDTO = z.infer<typeof genreSchema>;
