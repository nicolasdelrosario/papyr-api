import type { App } from "@/modules/core/infrastructure/hono/types/App";
import { DeleteBookGenreController } from "@bookGenres/infrastructure/controllers/DeleteBookGenreController";
import { FindBookGenreByIdController } from "@bookGenres/infrastructure/controllers/FindBookGenreByIdController";
import { ListBookGenresController } from "@bookGenres/infrastructure/controllers/ListBookGenresController";
import { ListBooksByGenreIdController } from "@bookGenres/infrastructure/controllers/ListBooksByGenreIdController";
import { ListGenresByBookIdController } from "@bookGenres/infrastructure/controllers/ListGenresByBookIdController";
import { RestoreBookGenreController } from "@bookGenres/infrastructure/controllers/RestoreBookGenreController";
import { SaveBookGenreController } from "@bookGenres/infrastructure/controllers/SaveBookGenreController";
import { SoftDeleteBookGenreController } from "@bookGenres/infrastructure/controllers/SoftDeleteBookGenreController";
import {
  zodBookGenreIdParamSchema,
  zodBookGenreSaveSchema,
} from "@bookGenres/infrastructure/schemas/zodBookGenreSchema";
import { zodBookIdParamSchema } from "@books/infrastructure/schemas/zodBookSchema";
import { zodGenreIdParamSchema } from "@genres/infrastructure/schemas/zodGenreSchema";
import { zValidator } from "@hono/zod-validator";
import type { Hono } from "hono";
const list = new ListBookGenresController();
const listBooksByGenreId = new ListBooksByGenreIdController();
const listGenresByBookId = new ListGenresByBookIdController();
const findById = new FindBookGenreByIdController();
const save = new SaveBookGenreController();
const deleteBookGenre = new DeleteBookGenreController();
const restore = new RestoreBookGenreController();
const softDelete = new SoftDeleteBookGenreController();

const bookIdValidation = zValidator("param", zodBookIdParamSchema);
const genreIdValidation = zValidator("param", zodGenreIdParamSchema);
const bookGenreIdValidation = zValidator("param", zodBookGenreIdParamSchema);
const saveValidation = zValidator("json", zodBookGenreSaveSchema);

export const register = (app: Hono<App>): void => {
  app.get("/genres/:id/books", genreIdValidation, listBooksByGenreId.handle);
  app.get("/books/:id/genres", bookIdValidation, listGenresByBookId.handle);
  app.get("/book-genres", list.handle);
  app.get("/book-genres/:id", bookGenreIdValidation, findById.handle);
  app.post("/book-genres", saveValidation, save.handle);
  app.delete("/book-genres/:id", bookGenreIdValidation, deleteBookGenre.handle);
  app.post("/book-genres/:id/restore", bookGenreIdValidation, restore.handle);
  app.post("/book-genres/:id/soft-delete", bookGenreIdValidation, softDelete.handle);
};
