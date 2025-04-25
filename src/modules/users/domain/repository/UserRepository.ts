import type { User } from "@users/domain/model/User";
import type { UserEmail } from "@users/domain/value-objects/UserEmail";
import type { UserId } from "@users/domain/value-objects/UserId";
import type { UserPassword } from "@users/domain/value-objects/UserPassword";
import type { UserUpdatedAt } from "@users/domain/value-objects/UserUpdatedAt";
import type { UserUsername } from "@users/domain/value-objects/UserUsername";

export interface UserRepository {
  list(): Promise<User[]>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  findByUsername(username: UserUsername): Promise<User | null>;
  save(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
  changePassword(id: UserId, password: UserPassword, updatedAt: UserUpdatedAt): Promise<void>;
}
