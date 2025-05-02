import type { App } from "@core/infrastructure/hono/types/App";
import { zValidator } from "@hono/zod-validator";
import { DeleteUserController } from "@users/infrastructure/controllers/DeleteUserController";
import { FindUserByIdController } from "@users/infrastructure/controllers/FindUserByIdController";
import { ListUsersController } from "@users/infrastructure/controllers/ListUsersController";
import { RestoreUserController } from "@users/infrastructure/controllers/RestoreUserController";
import { SaveUserController } from "@users/infrastructure/controllers/SaveUserController";
import { SoftDeleteUserController } from "@users/infrastructure/controllers/SoftDeleteUserController";
import { userIdParamSchema, userSaveSchema } from "@users/infrastructure/schemas/zodUserSchema";
import type { Hono } from "hono";

const list = new ListUsersController();
const findById = new FindUserByIdController();
const save = new SaveUserController();
const deleteUser = new DeleteUserController();
const restore = new RestoreUserController();
const softDelete = new SoftDeleteUserController();

const idValidation = zValidator("param", userIdParamSchema);
const saveValidation = zValidator("json", userSaveSchema);

export const register = (app: Hono<App>): void => {
  app.get("/users", list.handle);
  app.get("/users/:id", idValidation, findById.handle);
  app.post("/signup", saveValidation, save.handle);
  app.delete("/users/:id", idValidation, deleteUser.handle);
  app.post("/users/:id/restore", idValidation, restore.handle);
  app.post("/users/:id/soft-delete", idValidation, softDelete.handle);
};
