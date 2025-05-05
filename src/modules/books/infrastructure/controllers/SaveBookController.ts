import { BookIsNotActive } from "@books/domain/exceptions/BookIsNotActive";
import { BookWasNotFound } from "@books/domain/exceptions/BookWasNotFound";
import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class SaveBookController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const services = c.get("services");
      const book = await c.req.json();

      await services.books.save.execute(book);

      return c.json({ data: null, message: "Book was saved successfully" }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof BookIsNotActive)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.FORBIDDEN);

      if (error instanceof BookWasNotFound)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.NOT_FOUND);

      throw error;
    }
  }
}
