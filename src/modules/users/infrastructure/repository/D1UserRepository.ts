import type { UserDTO } from "@users/application/dtos/UserDto";
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
import { zodUserSchema } from "@users/infrastructure/schemas/zodUserSchema";

export class D1UserRepository implements UserRepository {
  constructor(private readonly db: D1Database) {}

  async list(): Promise<User[]> {
    const { results } = await this.db.prepare("SELECT * FROM users WHERE deleted_at IS NULL").all<UserDTO>();

    return results.map((row) => this.mapToDomain(row));
  }

  async findById(id: UserId): Promise<User | null> {
    const row = await this.db.prepare("SELECT * FROM users WHERE id = ?").bind(id.value).first<UserDTO>();

    return row ? this.mapToDomain(row) : null;
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    const row = await this.db.prepare("SELECT * FROM users WHERE email = ? ").bind(email.value).first<UserDTO>();

    return row ? this.mapToDomain(row) : null;
  }

  async findByUsername(username: UserUsername): Promise<User | null> {
    const row = await this.db.prepare("SELECT * FROM users WHERE username = ? ").bind(username.value).first<UserDTO>();

    return row ? this.mapToDomain(row) : null;
  }

  async save(user: User): Promise<void> {
    await this.db
      .prepare(
        `
      INSERT INTO users (
        id, name, username, email, password, avatar_url,
        created_at, updated_at, deleted_at
      )
      VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        username = excluded.username,
        email = excluded.email,
        password = excluded.password,
        avatar_url = excluded.avatar_url,
        updated_at = excluded.updated_at,
        deleted_at = excluded.deleted_at
  `,
      )
      .bind(
        user.id.value,
        user.name.value,
        user.username.value,
        user.email.value,
        user.password.value,
        user.avatarUrl.value,
        user.createdAt.value.toISOString(),
        user.updatedAt.value.toISOString(),
        user.deletedAt.value ? user.deletedAt.value.toISOString() : null,
      )
      .run();
  }

  async delete(id: UserId): Promise<void> {
    await this.db.prepare("DELETE FROM users WHERE id = ?").bind(id.value).run();
  }

  async changePassword(id: UserId, password: UserPassword, updatedAt: UserUpdatedAt): Promise<void> {
    await this.db
      .prepare("UPDATE users SET password = ?, updated_at = ? WHERE id = ?")
      .bind(password.value, updatedAt.value.toISOString(), id.value)
      .run();
  }

  private mapToDomain(row: UserDTO): User {
    const parsed = zodUserSchema.parse(row);

    return new User(
      new UserId(parsed.id),
      new UserName(parsed.name),
      new UserUsername(parsed.username),
      new UserEmail(parsed.email),
      new UserPassword(parsed.password),
      new UserAvatarUrl(parsed.avatarUrl),
      new UserCreatedAt(parsed.createdAt),
      new UserUpdatedAt(parsed.updatedAt),
      new UserDeletedAt(parsed.deletedAt),
    );
  }
}
