import { AuthorIsNotActive } from "@authors/domain/exceptions/AuthorIsNotActive";
import { AuthorWasNotFound } from "@authors/domain/exceptions/AuthorWasNotFound";
import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class SaveAuthorController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const services = c.get("services");
      const author = await c.req.json();

      await services.authors.save.execute(author);

      return c.json({ data: null, message: "Author was saved successfully" }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof AuthorIsNotActive)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.FORBIDDEN);

      if (error instanceof AuthorWasNotFound)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.NOT_FOUND);

      throw error;
    }
  }
}
