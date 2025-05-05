import { z } from "zod";

export const zodLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const zodChangePasswordSchema = zodLoginSchema.extend({
  newPassword: z.string().min(8),
});

export type LoginDTO = z.infer<typeof zodLoginSchema>;
export type ChangePasswordDTO = z.infer<typeof zodChangePasswordSchema>;
