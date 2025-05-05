import type { App } from "@core/infrastructure/hono/types/App";
import type { Hono } from "hono";

import * as authRoutes from "@auth/infrastructure/routes/honoAuthRoutes";
import * as authorRoutes from "@authors/infrastructure/routes/honoAuthorRoutes";
import * as genresRoutes from "@genres/infrastructure/routes/honoGenreRoutes";
import * as publisherRoutes from "@publishers/infrastructure/routes/honoPublisherRoutes";
import * as userRoutes from "@users/infrastructure/routes/honoUserRoutes";

const routes = [authRoutes, userRoutes, authorRoutes, publisherRoutes, genresRoutes];

export function registerRoutes(app: Hono<App>): void {
  for (const route of routes) {
    route.register(app);
  }
}
