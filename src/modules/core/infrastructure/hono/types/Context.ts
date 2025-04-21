import type { Services } from "@/modules/core/infrastructure/services";
import type { Env } from "@core/infrastructure/config/environment";

export type Variables = {
  env: Env;
  services: Services;
};
