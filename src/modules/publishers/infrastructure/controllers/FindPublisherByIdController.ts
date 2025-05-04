import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import * as HttpStatusPhrases from "@core/common/httpStatusPhrases";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import { PublisherIsNotActive } from "@publishers/domain/exceptions/PublisherIsNotActive";
import { PublisherWasNotFound } from "@publishers/domain/exceptions/PublisherWasNotFound";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class FindPublisherByIdController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const id = c.req.param("id");
      const services = c.get("services");

      const publisher = await services.publishers.findById.execute(id);

      return c.json(
        {
          data: publisher.toPrimitives(),
          message: HttpStatusPhrases.OK,
        },
        HttpStatusCodes.OK,
      );
    } catch (error) {
      if (error instanceof PublisherWasNotFound)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.NOT_FOUND);

      if (error instanceof PublisherIsNotActive)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.FORBIDDEN);

      throw error;
    }
  }
}
