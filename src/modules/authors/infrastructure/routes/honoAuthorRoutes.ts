import type { App } from "@/modules/core/infrastructure/hono/types/App";
import { DeleteAuthorController } from "@authors/infrastructure/controllers/DeleteAuthorController";
import { FindAuthorByIdController } from "@authors/infrastructure/controllers/FindAuthorByIdController";
import { ListAuthorsController } from "@authors/infrastructure/controllers/ListAuthorsController";
import { RestoreAuthorController } from "@authors/infrastructure/controllers/RestoreAuthorController";
import { SaveAuthorController } from "@authors/infrastructure/controllers/SaveAuthorController";
import { SoftDeleteAuthorController } from "@authors/infrastructure/controllers/SoftDeleteAuthorController";
import { authorIdParamSchema, authorSaveSchema } from "@authors/infrastructure/schemas/zodAuthorSchema";
import { zValidator } from "@hono/zod-validator";
import type { Hono } from "hono";

const list = new ListAuthorsController();
const findById = new FindAuthorByIdController();
const save = new SaveAuthorController();
const deleteAuthor = new DeleteAuthorController();
const restore = new RestoreAuthorController();
const softDelete = new SoftDeleteAuthorController();

const idValidation = zValidator("param", authorIdParamSchema);
const saveValidation = zValidator("json", authorSaveSchema);

export const register = (app: Hono<App>): void => {
  app.get("/authors", list.handle);
  app.get("/authors/:id", idValidation, findById.handle);
  app.post("/authors", saveValidation, save.handle);
  app.delete("/authors/:id", idValidation, deleteAuthor.handle);
  app.post("/authors/:id/restore", idValidation, restore.handle);
  app.post("/authors/:id/soft-delete", idValidation, softDelete.handle);
};
