import { AuthenticateController } from "@auth/infrastructure/controllers/AuthenticateController";
import { ChangePasswordController } from "@auth/infrastructure/controllers/ChangePasswordController";
import { LogoutController } from "@auth/infrastructure/controllers/LogoutController";
import { zodChangePasswordSchema, zodLoginSchema } from "@auth/infrastructure/schemas/zodAuthSchema";
import type { App } from "@core/infrastructure/hono/types/App";
import { zValidator } from "@hono/zod-validator";
import type { Hono } from "hono";

const authenticate = new AuthenticateController();
const logout = new LogoutController();
const changePassword = new ChangePasswordController();

export const register = (app: Hono<App>): void => {
  app.post("/login", zValidator("json", zodLoginSchema), authenticate.handle);
  app.post("/logout", logout.handle);
  app.post("/change-password", zValidator("json", zodChangePasswordSchema), changePassword.handle);
};
