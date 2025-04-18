import { InvalidEnvironment } from "@core/domain/exceptions/InvalidEnvironment";
import { z } from "zod";

const envSchema = z.object({
  ENVIRONMENT: z.enum(["development", "production", "test"]),
  JWT_SECRET: z.string().min(32),
});

export type Env = z.infer<typeof envSchema>;

export const parseValidatedEnv = (rawEnv: unknown): Env => {
  const parsed = envSchema.safeParse(rawEnv);

  if (!parsed.success) {
    console.error(parsed.error.flatten());
    throw new InvalidEnvironment("Invalid environment configuration");
  }

  return parsed.data;
};
