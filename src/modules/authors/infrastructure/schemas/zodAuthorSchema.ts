import { z } from "zod";

export const authorSchema = z.object({
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

export const authorSaveSchema = authorSchema
  .extend({
    id: z.string().uuid().optional(),
  })
  .omit({
    created_at: true,
    updated_at: true,
    deleted_at: true,
  });

export const authorIdParamSchema = authorSchema.pick({
  id: true,
});

export type AuthorDTO = z.infer<typeof authorSchema>;
