import type { NotFoundHandler } from "hono";

import { NOT_FOUND as NOT_FOUND_CODE } from "@core/common/httpStatusCodes";
import { NOT_FOUND as NOT_FOUND_PHRASE } from "@core/common/httpStatusPhrases";

export const notFound: NotFoundHandler = (c) => {
  return c.json(
    {
      message: `${NOT_FOUND_PHRASE} - ${c.req.path}`,
    },
    NOT_FOUND_CODE,
  );
};
