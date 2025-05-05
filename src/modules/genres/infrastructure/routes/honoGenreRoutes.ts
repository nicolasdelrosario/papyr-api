import type { App } from "@core/infrastructure/hono/types/App";
import { DeleteGenreController } from "@genres/infrastructure/controllers/DeleteGenreController";
import { FindGenreByIdController } from "@genres/infrastructure/controllers/FindGenreByIdController";
import { ListGenresController } from "@genres/infrastructure/controllers/ListGenresController";
import { RestoreGenreController } from "@genres/infrastructure/controllers/RestoreGenreController";
import { SaveGenreController } from "@genres/infrastructure/controllers/SaveGenreController";
import { SoftDeleteGenreController } from "@genres/infrastructure/controllers/SoftDeleteGenreController";
import { zodGenreIdParamSchema, zodGenreSaveSchema } from "@genres/infrastructure/schemas/zodGenreSchema";
import { zValidator } from "@hono/zod-validator";
import type { Hono } from "hono";

const list = new ListGenresController();
const findById = new FindGenreByIdController();
const save = new SaveGenreController();
const deleteUser = new DeleteGenreController();
const restore = new RestoreGenreController();
const softDelete = new SoftDeleteGenreController();

const idValidation = zValidator("param", zodGenreIdParamSchema);
const saveValidation = zValidator("json", zodGenreSaveSchema);

export const register = (app: Hono<App>): void => {
  app.get("/genres", list.handle);
  app.get("/genres/:id", idValidation, findById.handle);
  app.post("/genres", saveValidation, save.handle);
  app.delete("/genres/:id", idValidation, deleteUser.handle);
  app.post("/genres/:id/restore", idValidation, restore.handle);
  app.post("/genres/:id/soft-delete", idValidation, softDelete.handle);
};
