import type { App } from "@core/infrastructure/hono/types/App";
import type { Hono } from "hono";

import * as userRoutes from "@users/infrastructure/routes/honoUserRoutes";

const routes = [userRoutes];

export function registerRoutes(app: Hono<App>): void {
  for (const route of routes) {
    route.register(app);
  }
}
