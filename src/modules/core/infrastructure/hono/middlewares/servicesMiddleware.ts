import type { App } from "@core/infrastructure/hono/types/App";
import { services as createServices } from "@core/infrastructure/services";
import type { Context, MiddlewareHandler, Next } from "hono";

export const servicesMiddleware: MiddlewareHandler = async (c: Context<App>, next: Next) => {
  const db: D1Database = c.env.DB;
  const jwtSecret = c.env.JWT_SECRET;

  const services = createServices(db, jwtSecret);

  c.set("services", services);

  await next();
};
