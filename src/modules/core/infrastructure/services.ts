import { Authenticate } from "@/modules/auth/application/Authenticate";
import { ChangePassword } from "@/modules/auth/application/ChangePassword";
import { BcryptEncryptionService } from "@auth/infrastructure/services/BcryptEncryptionService";
import { DeleteUser } from "@users/application/DeleteUser";
import { EditUser } from "@users/application/EditUser";
import { GetUserByEmail } from "@users/application/GetUserByEmail";
import { GetUserById } from "@users/application/GetUserById";
import { GetUserByUsername } from "@users/application/GetUserByUsername";
import { GetUsers } from "@users/application/GetUsers";
import { RegisterUser } from "@users/application/RegisterUser";
import { RemoveUser } from "@users/application/RemoveUser";
import { RestoreUser } from "@users/application/RestoreUser";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { D1UserRepository } from "@users/infrastructure/repository/D1UserRepository";

export const services = (db: D1Database, jwtSecret: string) => {
  // repositories
  const userRepository: UserRepository = new D1UserRepository(db);

  // services
  const encryptionService = new BcryptEncryptionService();

  return {
    auth: {
      authenticate: new Authenticate(userRepository, encryptionService, jwtSecret),
      changePassword: new ChangePassword(userRepository, encryptionService),
    },
    users: {
      getAll: new GetUsers(userRepository),
      findByEmail: new GetUserByEmail(userRepository),
      findById: new GetUserById(userRepository),
      findByUsername: new GetUserByUsername(userRepository),
      register: new RegisterUser(userRepository, encryptionService),
      edit: new EditUser(userRepository),
      remove: new RemoveUser(userRepository),
      restore: new RestoreUser(userRepository),
      delete: new DeleteUser(userRepository),
    },
  };
};

export type Services = ReturnType<typeof services>;
