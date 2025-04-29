import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import * as HttpStatusPhrases from "@core/common/httpStatusPhrases";
import { InvalidCredentials } from "@core/domain/exceptions/InvalidCredentials";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import type { Context, TypedResponse } from "hono";
import { setCookie } from "hono/cookie";
import type { StatusCode } from "hono/utils/http-status";

export class ChangePasswordController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const services = c.get("services");
      const credentials = await c.req.json();

      await services.auth.changePassword.execute(credentials);

      setCookie(c, "token", "", {
        path: "/",
        httpOnly: true,
        secure: c.env.ENVIRONMENT === "production",
        sameSite: c.env.ENVIRONMENT === "production" ? "lax" : "strict",
        maxAge: 0,
      });

      return c.json({ data: null, message: HttpStatusPhrases.OK }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof InvalidCredentials)
        return c.json({ data: null, message: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED);

      throw error;
    }
  }
}
