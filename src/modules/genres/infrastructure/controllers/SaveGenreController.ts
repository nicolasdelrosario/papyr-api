import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import { GenreIsNotActive } from "@genres/domain/exceptions/GenreIsNotActive";
import { GenreWasNotFound } from "@genres/domain/exceptions/GenreWasNotFound";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class SaveGenreController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const services = c.get("services");
      const genre = await c.req.json();

      await services.genres.save.execute(genre);

      return c.json({ data: null, message: "Genre was saved successfully" }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof GenreIsNotActive)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.FORBIDDEN);

      if (error instanceof GenreWasNotFound)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.NOT_FOUND);

      throw error;
    }
  }
}
