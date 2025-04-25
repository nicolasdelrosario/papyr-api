import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import * as HttpStatusPhrases from "@core/common/httpStatusPhrases";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import { UserIsActive } from "@users/domain/exceptions/UserIsActive";
import { UserWasNotFound } from "@users/domain/exceptions/UserWasNotFound";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class DeleteUserController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const id = c.req.param("id");
      const services = c.get("services");

      await services.users.delete.execute(id);

      return c.json({ data: null, message: HttpStatusPhrases.OK }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof UserWasNotFound)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.NOT_FOUND);

      if (error instanceof UserIsActive)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.FORBIDDEN);

      throw error;
    }
  }
}
