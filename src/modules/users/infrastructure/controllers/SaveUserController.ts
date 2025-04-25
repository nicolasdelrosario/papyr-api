import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import * as HttpStatusPhrases from "@core/common/httpStatusPhrases";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import { EmailAlreadyInUse } from "@users/domain/exceptions/EmailAlreadyInUse";
import { UserWasNotFound } from "@users/domain/exceptions/UserWasNotFound";
import { UsernameAlreadyInUse } from "@users/domain/exceptions/UsernameAlreadyInUse";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class SaveUserController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const services = c.get("services");
      const user = await c.req.json();

      await services.users.save.execute(user);

      return c.json({ data: null, message: HttpStatusPhrases.OK }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof EmailAlreadyInUse || error instanceof UsernameAlreadyInUse)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.CONFLICT);

      if (error instanceof UserWasNotFound)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.NOT_FOUND);

      throw error;
    }
  }
}
