import type { Bindings } from "@core/infrastructure/hono/types/Bindings";
import type { Variables } from "@core/infrastructure/hono/types/Context";

export type App = {
  Bindings: Bindings;
  Variables: Variables;
};
