import { Authenticate } from "@/modules/auth/application/Authenticate";
import { ChangePassword } from "@/modules/auth/application/ChangePassword";
import { DeleteUser } from "@/modules/users/application/use-cases/DeleteUser";
import { FindUserByEmail } from "@/modules/users/application/use-cases/FindUserByEmail";
import { FindUserById } from "@/modules/users/application/use-cases/FindUserById";
import { FindUserByUsername } from "@/modules/users/application/use-cases/FindUserByUsername";
import { ListUsers } from "@/modules/users/application/use-cases/ListUsers";
import { RestoreUser } from "@/modules/users/application/use-cases/RestoreUser";
import { SaveUser } from "@/modules/users/application/use-cases/SaveUser";
import { SoftDeleteUser } from "@/modules/users/application/use-cases/SoftDeleteUser";
import { BcryptEncryptionService } from "@auth/infrastructure/services/BcryptEncryptionService";
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
      list: new ListUsers(userRepository),
      findById: new FindUserById(userRepository),
      findByEmail: new FindUserByEmail(userRepository),
      findByUsername: new FindUserByUsername(userRepository),
      save: new SaveUser(userRepository, encryptionService),
      delete: new DeleteUser(userRepository),
      restore: new RestoreUser(userRepository),
      softDelete: new SoftDeleteUser(userRepository),
    },
  };
};

export type Services = ReturnType<typeof services>;
