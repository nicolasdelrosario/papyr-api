import type { EncryptionService } from "@auth/domain/services/EncryptionService";
import type { SaveUserDto } from "@users/application/dtos/SaveUserDto";
import { EmailAlreadyInUse } from "@users/domain/exceptions/EmailAlreadyInUse";
import { UserIsNotActive } from "@users/domain/exceptions/UserIsNotActive";
import { UsernameAlreadyInUse } from "@users/domain/exceptions/UsernameAlreadyInUse";
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

export class SaveUser {
  constructor(
    private readonly repository: UserRepository,
    private readonly service: EncryptionService,
  ) {}

  async execute(user: SaveUserDto) {
    const userId = user.id ? new UserId(user.id) : new UserId(crypto.randomUUID());
    const now = new Date();

    const existingUser = await this.repository.findById(userId);
    const existingEmail = await this.repository.findByEmail(new UserEmail(user.email));
    const existingUsername = await this.repository.findByUsername(new UserUsername(user.username));

    if (!existingUser) {
      if (existingEmail) throw new EmailAlreadyInUse("The email is already in use");

      if (existingUsername) throw new UsernameAlreadyInUse("The username is already in use");

      const hashedPassword = await this.service.hash(new UserPassword(user.password));

      const newUser = new User(
        userId,
        new UserName(user.name),
        new UserUsername(user.username),
        new UserEmail(user.email),
        new UserPassword(hashedPassword),
        new UserAvatarUrl(user.avatarUrl ?? null),
        new UserCreatedAt(now),
        new UserUpdatedAt(now),
        new UserDeletedAt(null),
      );

      return await this.repository.save(newUser);
    }

    if (!existingUser.isActive()) throw new UserIsNotActive("User is not active");

    const updatedUser = new User(
      userId,
      new UserName(user.name ?? existingUser.name.value),
      new UserUsername(user.username ?? existingUser.username.value),
      new UserEmail(user.email ?? existingUser.email.value),
      new UserPassword(existingUser.password.value),
      new UserAvatarUrl(user.avatarUrl ?? existingUser.avatarUrl.value),
      new UserCreatedAt(existingUser.createdAt.value),
      new UserUpdatedAt(now),
      new UserDeletedAt(existingUser.deletedAt.value),
    );

    return await this.repository.save(updatedUser);
  }
}
