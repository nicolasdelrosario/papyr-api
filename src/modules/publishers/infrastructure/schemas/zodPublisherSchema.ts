import { z } from "zod";

export const publisherSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  country: z.string().min(2),
  website_url: z.string().url().nullable(),
  founded_year: z.coerce.date(),
  description: z.string().min(10).nullable(),
  logo_url: z.string().url().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
});

export const publisherSaveSchema = publisherSchema
  .extend({
    id: z.string().uuid().optional(),
  })
  .omit({
    created_at: true,
    updated_at: true,
    deleted_at: true,
  });

export const publisherIdParamSchema = publisherSchema.pick({
  id: true,
});

export type PublisherDTO = z.infer<typeof publisherSchema>;
