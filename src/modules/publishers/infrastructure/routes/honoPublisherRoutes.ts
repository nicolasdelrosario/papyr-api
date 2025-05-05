import type { App } from "@/modules/core/infrastructure/hono/types/App";
import { zValidator } from "@hono/zod-validator";
import { DeletePublisherController } from "@publishers/infrastructure/controllers/DeletePublisherController";
import { FindPublisherByIdController } from "@publishers/infrastructure/controllers/FindPublisherByIdController";
import { ListPublishersController } from "@publishers/infrastructure/controllers/ListPublishersController";
import { RestorePublisherController } from "@publishers/infrastructure/controllers/RestorePublisherController";
import { SavePublisherController } from "@publishers/infrastructure/controllers/SavePublisherController";
import { SoftDeletePublisherController } from "@publishers/infrastructure/controllers/SoftDeletePublisherController";
import {
  zodPublisherIdParamSchema,
  zodPublisherSaveSchema,
} from "@publishers/infrastructure/schemas/zodPublisherSchema";
import type { Hono } from "hono";

const list = new ListPublishersController();
const findById = new FindPublisherByIdController();
const save = new SavePublisherController();
const deletePublisher = new DeletePublisherController();
const restore = new RestorePublisherController();
const softDelete = new SoftDeletePublisherController();

const idValidation = zValidator("param", zodPublisherIdParamSchema);
const saveValidation = zValidator("json", zodPublisherSaveSchema);

export const register = (app: Hono<App>): void => {
  app.get("/publishers", list.handle);
  app.get("/publishers/:id", idValidation, findById.handle);
  app.post("/publishers", saveValidation, save.handle);
  app.delete("/publishers/:id", idValidation, deletePublisher.handle);
  app.post("/publishers/:id/restore", idValidation, restore.handle);
  app.post("/publishers/:id/soft-delete", idValidation, softDelete.handle);
};
