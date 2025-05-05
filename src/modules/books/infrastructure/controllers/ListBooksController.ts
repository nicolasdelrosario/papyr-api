import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import * as HttpStatusPhrases from "@core/common/httpStatusPhrases";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class ListBooksController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    const services = c.get("services");
    const books = await services.books.list.execute();

    return c.json(
      {
        data: books.map((book) => book.toPrimitives()),
        message: HttpStatusPhrases.OK,
      },
      HttpStatusCodes.OK,
    );
  }
}
