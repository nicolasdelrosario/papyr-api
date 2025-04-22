import { InvalidCredentials } from "@/modules/core/domain/exceptions/InvalidCredentials";
import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import * as HttpStatusPhrases from "@core/common/httpStatusPhrases";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class ChangePasswordController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const services = c.get("services");
      const { email, password, newPassword } = await c.req.json();

      await services.auth.changePassword.execute(email, password, newPassword);

      return c.json({ data: null, message: HttpStatusPhrases.OK }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof InvalidCredentials)
        return c.json({ data: null, message: HttpStatusPhrases.UNAUTHORIZED }, HttpStatusCodes.UNAUTHORIZED);

      throw error;
    }
  }
}
