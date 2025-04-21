import { services as createServices } from "@core/infrastructure/Services";
import type { MiddlewareHandler } from "hono";

export const servicesMiddleware: MiddlewareHandler = async (c, next) => {
  const db: D1Database = c.env.DB;

  const services = createServices(db);

  c.set("services", services);

  await next();
};
