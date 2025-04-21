import { z } from "zod";

export const userIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  avatarUrl: z.string().url().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
});

export const userRegisterSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const userEditSchema = userSchema.omit({
  id: true,
  password: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const userPasswordSchema = userSchema.pick({
  id: true,
  password: true,
});

export type UserDTO = z.infer<typeof userSchema>;
export type UserEditDTO = z.infer<typeof userEditSchema>;
export type UserRegisterDTO = z.infer<typeof userRegisterSchema>;
export type UserPasswordDTO = z.infer<typeof userPasswordSchema>;
