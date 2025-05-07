import { BookGenreIsNotActive } from "@bookGenres/domain/exceptions/BookGenreIsNotActive";
import { BookGenreWasNotFound } from "@bookGenres/domain/exceptions/BookGenreWasNotFound";
import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class SoftDeleteBookGenreController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const id = c.req.param("id");
      const services = c.get("services");

      await services.bookGenres.softDelete.execute(id);

      return c.json(
        {
          data: null,
          message: "Book genre relationship was successfully soft deleted",
        },
        HttpStatusCodes.OK,
      );
    } catch (error) {
      if (error instanceof BookGenreWasNotFound)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.NOT_FOUND);

      if (error instanceof BookGenreIsNotActive)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.FORBIDDEN);

      throw error;
    }
  }
}
