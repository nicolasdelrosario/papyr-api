import { z } from "zod";

export const zodPublisherSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  country: z.string().min(2),
  websiteUrl: z.string().url().nullable(),
  foundedYear: z.coerce.date(),
  description: z.string().min(10).nullable(),
  logoUrl: z.string().url().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});

export const zodPublisherSaveSchema = zodPublisherSchema
  .extend({
    id: z.string().uuid().optional(),
  })
  .omit({
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  });

export const zodPublisherIdParamSchema = zodPublisherSchema.pick({
  id: true,
});
