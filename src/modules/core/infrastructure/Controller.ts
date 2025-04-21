import type { Context, TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export interface ControllerResponse {
  message?: string;
  [key: string]: unknown;
}

export interface Controller {
  handle(c: Context): Promise<Response & TypedResponse<ControllerResponse, StatusCode, "json">>;
}
