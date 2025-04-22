import type { App } from "@/modules/core/infrastructure/hono/types/App";
import { authMiddleware } from "@core/infrastructure/hono/middlewares/authMiddleware";
import { notFound } from "@core/infrastructure/hono/middlewares/notFound";
import { onError } from "@core/infrastructure/hono/middlewares/onError";
import { servicesMiddleware } from "@core/infrastructure/hono/middlewares/servicesMiddleware";
import { validateEnvironment } from "@core/infrastructure/hono/middlewares/validateEnvironment";
import { Hono } from "hono";
import { logger } from "hono/logger";

const BASE_PATH = "/api/v1";

export const createRouter = () => {
  return new Hono<App>().basePath(BASE_PATH);
};

export const createApp = () => {
  const app = createRouter();

  app.use(logger());

  app.notFound(notFound);
  app.onError(onError);

  app.use("*", validateEnvironment);
  app.use("*", servicesMiddleware);
  app.use("*", authMiddleware);

  return app;
};
