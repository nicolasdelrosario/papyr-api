import type { Services } from "@core/infrastructure/Services";
import type { Env } from "@core/infrastructure/config/environment";

export type Variables = {
  env: Env;
  services: Services;
};
