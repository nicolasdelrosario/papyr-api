import type { AuthorDTO } from "@authors/application/dtos/AuthorDto";
import { Author } from "@authors/domain/model/Author";
import type { AuthorRepository } from "@authors/domain/repository/AuthorRepository";
import { AuthorBiography } from "@authors/domain/value-objects/AuthorBiography";
import { AuthorBirthDate } from "@authors/domain/value-objects/AuthorBirthDate";
import { AuthorCreatedAt } from "@authors/domain/value-objects/AuthorCreatedAt";
import { AuthorDeathDate } from "@authors/domain/value-objects/AuthorDeathDate";
import { AuthorDeletedAt } from "@authors/domain/value-objects/AuthorDeletedAt";
import { AuthorId } from "@authors/domain/value-objects/AuthorId";
import { AuthorName } from "@authors/domain/value-objects/AuthorName";
import { AuthorNationality } from "@authors/domain/value-objects/AuthorNationality";
import { AuthorPhotoUrl } from "@authors/domain/value-objects/AuthorPhotoUrl";
import { AuthorUpdatedAt } from "@authors/domain/value-objects/AuthorUpdatedAt";
import { zodAuthorSchema } from "@authors/infrastructure/schemas/zodAuthorSchema";

export class D1AuthorRepository implements AuthorRepository {
  constructor(private readonly db: D1Database) {}

  async list(): Promise<Author[]> {
    const { results } = await this.db.prepare("SELECT * FROM authors WHERE deleted_at IS NULL").all<AuthorDTO>();

    return results.map((row) => this.mapToDomain(row));
  }

  async findById(id: AuthorId): Promise<Author | null> {
    const row = await this.db.prepare("SELECT * FROM authors WHERE id = ?").bind(id.value).first<AuthorDTO>();

    return row ? this.mapToDomain(row) : null;
  }

  async save(author: Author): Promise<void> {
    await this.db
      .prepare(
        `
        INSERT INTO authors (
          id,
          name,
          biography,
          birth_date,
          death_date,
          nationality,
          photo_url,
          created_at,
          updated_at,
          deleted_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
        ON CONFLICT(id) DO UPDATE SET
          name        = excluded.name,
          biography   = excluded.biography,
          birth_date  = excluded.birth_date,
          death_date  = excluded.death_date,
          nationality = excluded.nationality,
          photo_url   = excluded.photo_url,
          updated_at  = excluded.updated_at,
          deleted_at  = excluded.deleted_at
      `,
      )
      .bind(
        author.id.value,
        author.name.value,
        author.biography.value,
        author.birthDate.value.toISOString(),
        author.deathDate.value ? author.deathDate.value.toISOString() : null,
        author.nationality.value,
        author.photoUrl.value,
        author.createdAt.value.toISOString(),
        author.updatedAt.value.toISOString(),
        author.deletedAt.value ? author.deletedAt.value.toISOString() : null,
      )
      .run();
  }

  async delete(id: AuthorId): Promise<void> {
    await this.db.prepare("DELETE FROM authors WHERE id = ?").bind(id.value).run();
  }

  private mapToDomain(row: AuthorDTO): Author {
    const parsed = zodAuthorSchema.parse(row);
  
    return new Author(
      new AuthorId(parsed.id),
      new AuthorName(parsed.name),
      new AuthorBiography(parsed.biography),
      new AuthorBirthDate(new Date(parsed.birthDate)),
      new AuthorDeathDate(parsed.deathDate ? new Date(parsed.deathDate) : null),
      new AuthorNationality(parsed.nationality),
      new AuthorPhotoUrl(parsed.photoUrl),
      new AuthorCreatedAt(new Date(parsed.createdAt)),
      new AuthorUpdatedAt(new Date(parsed.updatedAt)),
      new AuthorDeletedAt(parsed.deletedAt ? new Date(parsed.deletedAt) : null),
    );
  }
}
