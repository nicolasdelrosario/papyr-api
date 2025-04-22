import { type Env, parseValidatedEnv } from "@core/infrastructure/config/environment";
import type { App } from "@core/infrastructure/hono/types/App";
import type { Context, MiddlewareHandler, Next } from "hono";

export const validateEnvironment: MiddlewareHandler = async (c: Context<App>, next: Next) => {
  const envConfig: Env = parseValidatedEnv(c.env);

  c.set("env", envConfig);

  await next();
};
