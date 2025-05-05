import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import { GenreIsNotActive } from "@genres/domain/exceptions/GenreIsNotActive";
import { GenreWasNotFound } from "@genres/domain/exceptions/GenreWasNotFound";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class SoftDeleteGenreController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const id = c.req.param("id");
      const services = c.get("services");

      await services.genres.softDelete.execute(id);

      return c.json(
        {
          data: null,
          message: "Genre was successfully soft deleted",
        },
        HttpStatusCodes.OK,
      );
    } catch (error) {
      if (error instanceof GenreWasNotFound)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.NOT_FOUND);

      if (error instanceof GenreIsNotActive)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.FORBIDDEN);

      throw error;
    }
  }
}
