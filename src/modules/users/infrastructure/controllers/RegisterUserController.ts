import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import * as HttpStatusPhrases from "@core/common/httpStatusPhrases";
import { InvalidData } from "@core/domain/exceptions/InvalidData";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import { UserAlreadyExists } from "@users/domain/exceptions/UserAlreadyExists";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class RegisterUserController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const services = c.get("services");
      const { name, username, email, avatarUrl, password } = await c.req.json();

      await services.users.register.execute(name, username, email, password, avatarUrl);

      return c.json({ data: null, message: HttpStatusPhrases.CREATED }, HttpStatusCodes.CREATED);
    } catch (error) {
      if (error instanceof UserAlreadyExists)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.CONFLICT);

      if (error instanceof InvalidData)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.BAD_REQUEST);

      throw error;
    }
  }
}
