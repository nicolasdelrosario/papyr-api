import { z } from "zod";

export const publisherSchema = z.object({
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

export const publisherSaveSchema = publisherSchema
  .extend({
    id: z.string().uuid().optional(),
  })
  .omit({
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  });

export const publisherIdParamSchema = publisherSchema.pick({
  id: true,
});

export type PublisherDTO = z.infer<typeof publisherSchema>;
