import { AuthorIsActive } from "@authors/domain/exceptions/AuthorIsActive";
import { AuthorWasNotFound } from "@authors/domain/exceptions/AuthorWasNotFound";
import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import * as HttpStatusPhrases from "@core/common/httpStatusPhrases";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class RestoreAuthorController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const id = c.req.param("id");
      const services = c.get("services");

      await services.authors.restore.execute(id);

      return c.json(
        {
          data: null,
          message: HttpStatusPhrases.OK,
        },
        HttpStatusCodes.OK,
      );
    } catch (error) {
      if (error instanceof AuthorWasNotFound)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.NOT_FOUND);

      if (error instanceof AuthorIsActive)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.CONFLICT);

      throw error;
    }
  }
}
