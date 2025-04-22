import type { App } from "@core/infrastructure/hono/types/App";
import type { Hono } from "hono";

import * as authRoutes from "@auth/infrastructure/routes/honoAuthRoutes";
import * as userRoutes from "@users/infrastructure/routes/honoUserRoutes";

const routes = [authRoutes, userRoutes];

export function registerRoutes(app: Hono<App>): void {
  for (const route of routes) {
    route.register(app);
  }
}
