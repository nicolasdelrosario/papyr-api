import { z } from "zod";

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  avatar_url: z.string().url().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
  deleted_at: z.coerce.date().nullable(),
});

export const userSaveSchema = userSchema
  .extend({
    id: z.string().uuid().optional(),
  })
  .omit({
    created_at: true,
    updated_at: true,
    deleted_at: true,
  });

export const userIdParamSchema = userSchema.pick({
  id: true,
});

export type UserDTO = z.infer<typeof userSchema>;
