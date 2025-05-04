import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import type { Controller, ControllerResponse } from "@core/infrastructure/Controller";
import type { App } from "@core/infrastructure/hono/types/App";
import { PublisherIsActive } from "@publishers/domain/exceptions/PublisherIsActive";
import { PublisherWasNotFound } from "@publishers/domain/exceptions/PublisherWasNotFound";
import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class DeletePublisherController implements Controller {
  async handle(c: Context<App>): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">> {
    try {
      const id = c.req.param("id");
      const services = c.get("services");

      await services.publishers.delete.execute(id);

      return c.json({ data: null, message: "Publisher was deleted successfully" }, HttpStatusCodes.OK);
    } catch (error) {
      if (error instanceof PublisherWasNotFound)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.NOT_FOUND);

      if (error instanceof PublisherIsActive)
        return c.json({ data: null, message: error.message }, HttpStatusCodes.CONFLICT);

      throw error;
    }
  }
}
