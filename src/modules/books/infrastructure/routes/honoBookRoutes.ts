import type { App } from "@/modules/core/infrastructure/hono/types/App";

import { zValidator } from "@hono/zod-validator";
import type { Hono } from "hono";
import { DeleteBookController } from "../controllers/DeleteBookController";
import { FindBookByIdController } from "../controllers/FindBookByIdController";
import { ListBooksController } from "../controllers/ListBooksController";
import { RestoreBookController } from "../controllers/RestoreBookController";
import { SaveBookController } from "../controllers/SaveBookController";
import { SoftDeleteBookController } from "../controllers/SoftDeleteBookController";
import { zodBookIdParamSchema, zodBookSaveSchema } from "../schemas/zodBookSchema";

const list = new ListBooksController();
const findById = new FindBookByIdController();
const save = new SaveBookController();
const deleteAuthor = new DeleteBookController();
const restore = new RestoreBookController();
const softDelete = new SoftDeleteBookController();

const idValidation = zValidator("param", zodBookIdParamSchema);
const saveValidation = zValidator("json", zodBookSaveSchema);

export const register = (app: Hono<App>): void => {
  app.get("/books", list.handle);
  app.get("/books/:id", idValidation, findById.handle);
  app.post("/books", saveValidation, save.handle);
  app.delete("/books/:id", idValidation, deleteAuthor.handle);
  app.post("/books/:id/restore", idValidation, restore.handle);
  app.post("/books/:id/soft-delete", idValidation, softDelete.handle);
};
