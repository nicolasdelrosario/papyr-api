import type { EncryptionService } from "@auth/domain/services/EncryptionService";
import { User } from "@users/domain/model/User";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { UserAvatarUrl } from "@users/domain/value-objects/UserAvatarUrl";
import { UserCreatedAt } from "@users/domain/value-objects/UserCreatedAt";
import { UserDeletedAt } from "@users/domain/value-objects/UserDeletedAt";
import { UserEmail } from "@users/domain/value-objects/UserEmail";
import { UserId } from "@users/domain/value-objects/UserId";
import { UserName } from "@users/domain/value-objects/UserName";
import { UserPassword } from "@users/domain/value-objects/UserPassword";
import { UserUpdatedAt } from "@users/domain/value-objects/UserUpdatedAt";
import { UserUsername } from "@users/domain/value-objects/UserUsername";
import { UserAlreadyExists } from "../domain/exceptions/UserAlreadyExists";

export class RegisterUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly service: EncryptionService,
  ) {}

  async execute(name: string, username: string, email: string, password: string, avatarUrl: string): Promise<void> {
    const existingById = await this.repository.findByEmail(new UserEmail(email));
    if (existingById) throw new UserAlreadyExists("User already exists");

    const existingByUsername = await this.repository.findByUsername(new UserUsername(username));
    if (existingByUsername) throw new UserAlreadyExists("Username already taken");

    const id = crypto.randomUUID();
    const hashedPassword = await this.service.hash(new UserPassword(password));

    const user = new User(
      new UserId(id),
      new UserName(name),
      new UserUsername(username),
      new UserEmail(email),
      hashedPassword,
      new UserAvatarUrl(avatarUrl),
      new UserCreatedAt(new Date()),
      new UserUpdatedAt(new Date()),
      new UserDeletedAt(null),
    );

    await this.repository.register(user);
  }
}
