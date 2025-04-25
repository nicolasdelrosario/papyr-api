import type { UserAvatarUrl } from "@users/domain/value-objects/UserAvatarUrl";
import type { UserCreatedAt } from "@users/domain/value-objects/UserCreatedAt";
import { UserDeletedAt } from "@users/domain/value-objects/UserDeletedAt";
import type { UserEmail } from "@users/domain/value-objects/UserEmail";
import type { UserId } from "@users/domain/value-objects/UserId";
import type { UserName } from "@users/domain/value-objects/UserName";
import type { UserPassword } from "@users/domain/value-objects/UserPassword";
import type { UserUpdatedAt } from "@users/domain/value-objects/UserUpdatedAt";
import type { UserUsername } from "@users/domain/value-objects/UserUsername";

export class User {
  id: UserId;
  name: UserName;
  username: UserUsername;
  email: UserEmail;
  password: UserPassword;
  avatarUrl: UserAvatarUrl;
  createdAt: UserCreatedAt;
  updatedAt: UserUpdatedAt;
  deletedAt: UserDeletedAt;

  constructor(
    id: UserId,
    name: UserName,
    username: UserUsername,
    email: UserEmail,
    password: UserPassword,
    avatarUrl: UserAvatarUrl,
    createdAt: UserCreatedAt,
    updatedAt: UserUpdatedAt,
    deletedAt: UserDeletedAt,
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatarUrl = avatarUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      username: this.username.value,
      email: this.email.value,
      password: this.password.value,
      avatarUrl: this.avatarUrl.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      deletedAt: this.deletedAt.value,
    };
  }

  public toSafePrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      username: this.username.value,
      email: this.email.value,
      avatarUrl: this.avatarUrl.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      deletedAt: this.deletedAt.value,
    };
  }

  isActive(): boolean {
    return this.deletedAt.value === null;
  }

  remove(): void {
    this.deletedAt = new UserDeletedAt(new Date());
  }

  restore(): void {
    this.deletedAt = new UserDeletedAt(null);
  }
}
