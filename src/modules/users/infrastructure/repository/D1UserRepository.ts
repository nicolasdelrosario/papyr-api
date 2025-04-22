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
import type { UserDTO } from "@users/infrastructure/schemas/zodUserSchema";

export class D1UserRepository implements UserRepository {
  constructor(private readonly db: D1Database) {}

  async getAll(): Promise<User[]> {
    const { results } = await this.db.prepare("SELECT * FROM users WHERE deletedAt IS NULL").all<UserDTO>();

    return results.map((row) => this.mapToDomain(row));
  }

  async findById(id: UserId): Promise<User | null> {
    const { results } = await this.db.prepare("SELECT * FROM users WHERE id = ?").bind(id.value).all<UserDTO>();

    if (!results.length) return null;

    return this.mapToDomain(results[0]);
  }

  async findByEmail(email: UserEmail): Promise<User | null> {
    const { results } = await this.db.prepare("SELECT * FROM users WHERE email = ?").bind(email.value).all<UserDTO>();

    if (!results.length) return null;

    return this.mapToDomain(results[0]);
  }

  async findByUsername(username: UserUsername): Promise<User | null> {
    const { results } = await this.db
      .prepare("SELECT * FROM users WHERE username = ?")
      .bind(username.value)
      .all<UserDTO>();

    if (!results.length) return null;

    return this.mapToDomain(results[0]);
  }

  async register(user: User): Promise<void> {
    const { id, name, username, email, password, avatarUrl, createdAt, updatedAt, deletedAt } = user;

    await this.db
      .prepare(
        "INSERT INTO users (id, name, username, email, password, avatarUrl, createdAt, updatedAt, deletedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      )
      .bind(
        id.value,
        name.value,
        username.value,
        email.value,
        password.value,
        avatarUrl.value,
        createdAt.value.toISOString(),
        updatedAt.value.toISOString(),
        deletedAt.value,
      )
      .run();
  }

  async edit(user: User): Promise<void> {
    const { id, name, username, email, avatarUrl, updatedAt } = user;

    await this.db
      .prepare(
        "UPDATE users SET name = ?, username = ?, email = ?, avatarUrl = ?, updatedAt = ? WHERE id = ? AND deletedAt IS NULL",
      )
      .bind(name.value, username.value, email.value, avatarUrl.value, updatedAt.value.toISOString(), id.value)
      .run();
  }

  async remove(id: UserId): Promise<void> {
    await this.db
      .prepare("UPDATE users SET deletedAt = ?, updatedAt = ? WHERE id = ? AND deletedAt IS NULL")
      .bind(new Date().toISOString(), new Date().toISOString(), id.value)
      .run();
  }

  async restore(id: UserId): Promise<void> {
    await this.db
      .prepare("UPDATE users SET deletedAt = NULL, updatedAt = ? WHERE id = ?")
      .bind(new Date().toISOString(), id.value)
      .run();
  }

  async delete(id: UserId): Promise<void> {
    await this.db.prepare("DELETE FROM users WHERE id = ?").bind(id.value).run();
  }

  async changePassword(id: UserId, password: UserPassword, updatedAt: UserUpdatedAt): Promise<void> {
    await this.db
      .prepare("UPDATE users SET password = ?, updatedAt = ? WHERE id = ? AND deletedAt IS NULL")
      .bind(password.value, updatedAt.value.toISOString(), id.value)
      .run();
  }

  private mapToDomain(row: UserDTO): User {
    return new User(
      new UserId(row.id),
      new UserName(row.name),
      new UserUsername(row.username),
      new UserEmail(row.email),
      new UserPassword(row.password),
      new UserAvatarUrl(row.avatarUrl),
      new UserCreatedAt(row.createdAt),
      new UserUpdatedAt(row.updatedAt),
      new UserDeletedAt(row.deletedAt),
    );
  }
}
