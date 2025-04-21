import { createApp } from "@core/infrastructure/hono/createApp";
import { registerRoutes } from "@core/infrastructure/hono/routes/registerRoutes";

const app = createApp();

registerRoutes(app);

export default app;
