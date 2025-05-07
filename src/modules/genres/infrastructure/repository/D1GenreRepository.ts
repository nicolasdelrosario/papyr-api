import type { GenreDTO } from "@genres/application/dtos/GenreDto";
import { Genre } from "@genres/domain/model/Genre";
import type { GenreRepository } from "@genres/domain/repository/GenreRepository";
import { GenreCreatedAt } from "@genres/domain/value-objects/GenreCreatedAt";
import { GenreDeletedAt } from "@genres/domain/value-objects/GenreDeletedAt";
import { GenreDescription } from "@genres/domain/value-objects/GenreDescription";
import { GenreId } from "@genres/domain/value-objects/GenreId";
import { GenreName } from "@genres/domain/value-objects/GenreName";
import { GenreUpdatedAt } from "@genres/domain/value-objects/GenreUpdatedAt";
import { zodGenreSchema } from "@genres/infrastructure/schemas/zodGenreSchema";

export class D1GenreRepository implements GenreRepository {
  constructor(private readonly db: D1Database) {}

  async list(): Promise<Genre[]> {
    const { results } = await this.db.prepare("SELECT * FROM genres WHERE deleted_at IS NULL").all<GenreDTO>();

    return results.map((row) => this.mapToDomain(row));
  }

  async findById(id: GenreId): Promise<Genre | null> {
    const row = await this.db.prepare("SELECT * FROM genres WHERE id = ?").bind(id.value).first<GenreDTO>();

    return row ? this.mapToDomain(row) : null;
  }

  async save(genre: Genre): Promise<void> {
    await this.db
      .prepare(
        `
        INSERT INTO genres (
          id,
          name,
          description,
          created_at,
          updated_at,
          deleted_at
        )
        VALUES (
          ?, ?, ?, ?, ?, ?
        )
        ON CONFLICT(id) DO UPDATE SET
          name = excluded.name,
          description = excluded.description,
          updated_at = excluded.updated_at,
          deleted_at = excluded.deleted_at
        `,
      )
      .bind(
        genre.id.value,
        genre.name.value,
        genre.description.value,
        genre.createdAt.value.toISOString(),
        genre.updatedAt.value.toISOString(),
        genre.deletedAt.value ? genre.deletedAt.value.toISOString() : null,
      )
      .run();
  }

  async delete(id: GenreId): Promise<void> {
    await this.db.prepare("DELETE FROM genres WHERE id = ?").bind(id.value).run();
  }

  private mapToDomain(row: GenreDTO): Genre {
    const parsed = zodGenreSchema.parse(row);

    return new Genre(
      new GenreId(parsed.id),
      new GenreName(parsed.name),
      new GenreDescription(parsed.description),
      new GenreCreatedAt(new Date(parsed.createdAt)),
      new GenreUpdatedAt(new Date(parsed.updatedAt)),
      new GenreDeletedAt(parsed.deletedAt ? new Date(parsed.deletedAt) : null),
    );
  }
}
