import { z } from "zod";

export const zodGenreSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  description: z.string().min(10).nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});

export const zodGenreSaveSchema = zodGenreSchema
  .extend({
    id: z.string().uuid().optional(),
  })
  .omit({
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  });

export const zodGenreIdParamSchema = zodGenreSchema.pick({
  id: true,
});
