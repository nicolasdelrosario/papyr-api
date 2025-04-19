import type { User } from "@users/domain/model/User";
import type { UserEmail } from "@users/domain/value-objects/UserEmail";
import type { UserId } from "@users/domain/value-objects/UserId";
import type { UserUsername } from "@users/domain/value-objects/UserUsername";

export interface UserRepository {
  getAll(): Promise<User[]>;
  findById(id: UserId): Promise<User | null>;
  findByEmail(email: UserEmail): Promise<User | null>;
  findByUsername(username: UserUsername): Promise<User | null>;
  register(user: User): Promise<void>;
  edit(user: User): Promise<void>;
  deleteById(id: UserId): Promise<void>;
}
