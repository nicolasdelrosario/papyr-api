import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import * as HttpStatusPhrases from "@core/common/httpStatusPhrases";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import type { Context, TypedResponse } from "hono";
import { setCookie } from "hono/cookie";
import type { StatusCode } from "hono/utils/http-status";

export class LogoutController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    setCookie(c, "token", "", {
      path: "/",
      httpOnly: true,
      secure: c.env.ENVIRONMENT === "production",
      sameSite: c.env.ENVIRONMENT === "production" ? "lax" : "strict",
      maxAge: 0,
    });

    return c.json({ data: null, message: HttpStatusPhrases.OK }, HttpStatusCodes.OK);
  }
}
