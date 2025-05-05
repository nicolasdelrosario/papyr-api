import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import * as HttpStatusPhrases from "@core/common/httpStatusPhrases";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class ListGenresController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    const services = c.get("services");
    const genres = await services.genres.list.execute();

    return c.json(
      {
        data: genres.map((genre) => genre.toPrimitives()),
        message: HttpStatusPhrases.OK,
      },
      HttpStatusCodes.OK,
    );
  }
}
