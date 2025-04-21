import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import * as HttpStatusPhrases from "@core/common/httpStatusPhrases";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import { UserAlreadyExists } from "@users/domain/exceptions/UserAlreadyExists";
import { UserNotActive } from "@users/domain/exceptions/UserNotActive";
import { UserNotFound } from "@users/domain/exceptions/UserNotFound";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class EditUserController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const id = c.req.param("id");
      const services = c.get("services");
      const { name, username, email, avatarUrl } = await c.req.json();

      await services.users.edit.execute(id, name, username, email, avatarUrl);

      return c.json({ data: null, message: HttpStatusPhrases.OK }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof UserNotFound)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.NOT_FOUND);

      if (error instanceof UserNotActive)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.FORBIDDEN);

      if (error instanceof UserAlreadyExists)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.CONFLICT);

      throw error;
    }
  }
}
