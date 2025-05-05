import { BookIsActive } from "@books/domain/exceptions/BookIsActive";
import { BookWasNotFound } from "@books/domain/exceptions/BookWasNotFound";
import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class RestoreBookController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const id = c.req.param("id");
      const services = c.get("services");

      await services.books.restore.execute(id);

      return c.json(
        {
          data: null,
          message: "Book was restored successfully",
        },
        HttpStatusCodes.OK,
      );
    } catch (error) {
      if (error instanceof BookWasNotFound)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.NOT_FOUND);

      if (error instanceof BookIsActive)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.CONFLICT);

      throw error;
    }
  }
}
