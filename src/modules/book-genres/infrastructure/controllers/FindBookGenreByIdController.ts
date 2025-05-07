import { BookGenreIsNotActive } from "@bookGenres/domain/exceptions/BookGenreIsNotActive";
import { BookGenreWasNotFound } from "@bookGenres/domain/exceptions/BookGenreWasNotFound";
import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import * as HttpStatusPhrases from "@core/common/httpStatusPhrases";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class FindBookGenreByIdController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const id = c.req.param("id");
      const services = c.get("services");

      const bookGenre = await services.bookGenres.findById.execute(id);

      return c.json(
        {
          data: bookGenre.toPrimitives(),
          message: HttpStatusPhrases.OK,
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
