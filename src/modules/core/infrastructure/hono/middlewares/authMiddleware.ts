import * as HttpStatusCodes from "@core/common/httpStatusCodes";
import * as HttpStatusPhrases from "@core/common/httpStatusPhrases";
import { InvalidToken } from "@core/domain/exceptions/InvalidToken";
import type { App } from "@core/infrastructure/hono/types/App";
import type { Context, MiddlewareHandler, Next } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";

const publicRoutes = ["/api/v1/login", "/api/v1/signup"];

export const authMiddleware: MiddlewareHandler = async (c: Context<App>, next: Next) => {
  const route = c.req.path;

  if (publicRoutes.includes(route)) return await next();

  const token = getCookie(c, "token");

  if (!token)
    return c.json(
      {
        data: null,
        message: HttpStatusPhrases.UNAUTHORIZED,
      },
      HttpStatusCodes.UNAUTHORIZED,
    );

  const payload = await verify(token, c.env.JWT_SECRET);

  if (!payload) throw new InvalidToken("Invalid token");

  c.set("jwtPayload", payload);

  return await next();
};
