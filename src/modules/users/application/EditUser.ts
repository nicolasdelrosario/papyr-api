import { UserAlreadyExists } from "@users/domain/exceptions/UserAlreadyExists";
import { UserNotActive } from "@users/domain/exceptions/UserNotActive";
import { UserNotFound } from "@users/domain/exceptions/UserNotFound";
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

export class EditUser {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string, name: string, username: string, email: string, avatarUrl: string): Promise<void> {
    const existingUser = await this.repository.findById(new UserId(id));

    if (!existingUser) throw new UserNotFound("User not found.");

    if (existingUser.deletedAt.value !== null) throw new UserNotActive("User is not active.");

    if (username && username !== existingUser.username.value) {
      const userWithSameUsername = await this.repository.findByUsername(new UserUsername(username));
      if (userWithSameUsername) throw new UserAlreadyExists("Username already exists.");
    }

    if (email && email !== existingUser.email.value) {
      const userWithSameEmail = await this.repository.findByEmail(new UserEmail(email));
      if (userWithSameEmail) throw new UserAlreadyExists("Email already exists.");
    }

    const user = new User(
      new UserId(existingUser.id.value),
      new UserName(name || existingUser.name.value),
      new UserUsername(username || existingUser.username.value),
      new UserEmail(email || existingUser.email.value),
      new UserPassword(existingUser.password.value),
      new UserAvatarUrl(avatarUrl || existingUser.avatarUrl.value),
      new UserCreatedAt(existingUser.createdAt.value),
      new UserUpdatedAt(new Date()),
      new UserDeletedAt(existingUser.deletedAt.value),
    );

    await this.repository.edit(user);
  }
}
