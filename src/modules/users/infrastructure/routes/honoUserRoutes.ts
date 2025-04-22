import type { App } from "@/modules/core/infrastructure/hono/types/App";
import { zValidator } from "@hono/zod-validator";
import { DeleteUserController } from "@users/infrastructure/controllers/DeleteUserController";
import { EditUserController } from "@users/infrastructure/controllers/EditUserController";
import { GetUserByIdController } from "@users/infrastructure/controllers/GetUserByIdController";
import { GetUsersController } from "@users/infrastructure/controllers/GetUsersController";
import { RegisterUserController } from "@users/infrastructure/controllers/RegisterUserController";
import { RemoveUserController } from "@users/infrastructure/controllers/RemoveUserController";
import { RestoreUserController } from "@users/infrastructure/controllers/RestoreUserController";
import { userEditSchema, userIdParamSchema, userRegisterSchema } from "@users/infrastructure/schemas/zodUserSchema";
import type { Hono } from "hono";

const getUsers = new GetUsersController();
const getUserById = new GetUserByIdController();
const registerUser = new RegisterUserController();
const editUser = new EditUserController();
const removeUser = new RemoveUserController();
const restoreUser = new RestoreUserController();
const deleteUser = new DeleteUserController();

export const register = (app: Hono<App>): void => {
  app.get("/users", getUsers.handle);
  app.get("/users/:id", zValidator("param", userIdParamSchema), getUserById.handle);
  app.post("/signup", zValidator("json", userRegisterSchema), registerUser.handle);
  app.put("/users/:id", zValidator("param", userIdParamSchema), zValidator("json", userEditSchema), editUser.handle);
  app.patch("/users/:id/remove", zValidator("param", userIdParamSchema), removeUser.handle);
  app.patch("/users/:id/restore", zValidator("param", userIdParamSchema), restoreUser.handle);
  app.delete("/users/:id", zValidator("param", userIdParamSchema), deleteUser.handle);
};
