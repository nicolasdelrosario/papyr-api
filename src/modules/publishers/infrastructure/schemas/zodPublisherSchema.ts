import { z } from "zod";

export const zodPublisherDbSchema = z.object({
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

export const zodPublisherSchema = zodPublisherDbSchema.transform((row) => ({
  id: row.id,
  name: row.name,
  country: row.country,
  websiteUrl: row.website_url,
  foundedYear: row.founded_year,
  description: row.description,
  logoUrl: row.logo_url,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  deletedAt: row.deleted_at,
}));

export const zodPublisherSaveSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(3),
  country: z.string().min(2),
  websiteUrl: z.string().url().nullable(),
  foundedYear: z.coerce.date(),
  description: z.string().min(10).nullable(),
  logoUrl: z.string().url().nullable(),
});

export const zodPublisherIdParamSchema = z.object({
  id: z.string().uuid(),
});
