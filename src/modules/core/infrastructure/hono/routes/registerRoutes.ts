import type { App } from "@core/infrastructure/hono/types/App";
import type { Hono } from "hono";

import * as authRoutes from "@auth/infrastructure/routes/honoAuthRoutes";
import * as authorRoutes from "@authors/infrastructure/routes/honoAuthorRoutes";
import * as bookGenreRoutes from "@bookGenres/infrastructure/routes/honoBookGenreRoutes";
import * as bookRoutes from "@books/infrastructure/routes/honoBookRoutes";
import * as genresRoutes from "@genres/infrastructure/routes/honoGenreRoutes";
import * as publisherRoutes from "@publishers/infrastructure/routes/honoPublisherRoutes";
import * as userRoutes from "@users/infrastructure/routes/honoUserRoutes";

const routes = [authRoutes, userRoutes, authorRoutes, publisherRoutes, genresRoutes, bookRoutes, bookGenreRoutes];

export function registerRoutes(app: Hono<App>): void {
  for (const route of routes) {
    route.register(app);
  }
}
