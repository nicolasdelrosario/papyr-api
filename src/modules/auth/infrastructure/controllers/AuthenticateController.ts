import { InvalidCredentials } from "@/modules/core/domain/exceptions/InvalidCredentials";
import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import * as HttpStatusPhrases from "@core/common/httpStatusPhrases";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import { UserIsNotActive } from "@users/domain/exceptions/UserIsNotActive";
import { UserWasNotFound } from "@users/domain/exceptions/UserWasNotFound";
import type { Context, TypedResponse } from "hono";
import { setCookie } from "hono/cookie";
import type { StatusCode } from "hono/utils/http-status";

export class AuthenticateController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const services = c.get("services");
      const { email, password } = await c.req.json();

      const user = await services.auth.authenticate.execute(email, password);

      setCookie(c, "token", user.token, {
        path: "/",
        httpOnly: true,
        secure: c.env.ENVIRONMENT === "production",
        sameSite: c.env.ENVIRONMENT === "production" ? "lax" : "strict",
        maxAge: 60 * 60 * 7,
      });

      return c.json(
        {
          data: { id: user.id, name: user.name, email: user.email },
          message: HttpStatusPhrases.OK,
        },
        HttpStatusCodes.OK,
      );
    } catch (error) {
      if (error instanceof UserWasNotFound)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.NOT_FOUND);

      if (error instanceof UserIsNotActive)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.FORBIDDEN);

      if (error instanceof InvalidCredentials)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.UNAUTHORIZED);

      throw error;
    }
  }
}
