import { z } from "zod";

export const zodAuthorSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  biography: z.string().min(10).nullable(),
  birthDate: z.coerce.date(),
  deathDate: z.coerce.date().nullable(),
  nationality: z.string().min(3).nullable(),
  photoUrl: z.string().url().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});

export const zodAuthorSaveSchema = zodAuthorSchema
  .extend({
    id: z.string().uuid().optional(),
  })
  .omit({
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  });

export const zodAuthorIdParamSchema = zodAuthorSchema.pick({
  id: true,
});
