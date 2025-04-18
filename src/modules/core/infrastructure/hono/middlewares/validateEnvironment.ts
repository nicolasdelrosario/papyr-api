import { type Env, parseValidatedEnv } from "@core/infrastructure/config/environment";
import type { MiddlewareHandler } from "hono";

export const validateEnvironment: MiddlewareHandler = async (c, next) => {
  const envConfig: Env = parseValidatedEnv(c.env);

  c.set("env", envConfig);

  await next();
};
