import { z } from "zod";

export const zodUserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  avatarUrl: z.string().url().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});

export const zodUserSaveSchema = zodUserSchema
  .extend({
    id: z.string().uuid().optional(),
  })
  .omit({
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  });

export const zodUserIdParamSchema = zodUserSchema.pick({
  id: true,
});
