import type { SaveGenreDto } from "@genres/application/dtos/SaveGenreDto";
import { GenreIsNotActive } from "@genres/domain/exceptions/GenreIsNotActive";
import { Genre } from "@genres/domain/model/Genre";
import type { GenreRepository } from "@genres/domain/repository/GenreRepository";
import { GenreCreatedAt } from "@genres/domain/value-objects/GenreCreatedAt";
import { GenreDeletedAt } from "@genres/domain/value-objects/GenreDeletedAt";
import { GenreDescription } from "@genres/domain/value-objects/GenreDescription";
import { GenreId } from "@genres/domain/value-objects/GenreId";
import { GenreName } from "@genres/domain/value-objects/GenreName";
import { GenreUpdatedAt } from "@genres/domain/value-objects/GenreUpdatedAt";

export class SaveGenre {
  constructor(private readonly repository: GenreRepository) {}

  async execute(genre: SaveGenreDto): Promise<void> {
    const genreId = genre.id ? new GenreId(genre.id) : new GenreId(crypto.randomUUID());
    const now = new Date();

    const existingGenre = await this.repository.findById(genreId);

    if (!existingGenre) {
      const newGenre = new Genre(
        genreId,
        new GenreName(genre.name),
        new GenreDescription(genre.description),
        new GenreCreatedAt(now),
        new GenreUpdatedAt(now),
        new GenreDeletedAt(null),
      );

      return await this.repository.save(newGenre);
    }

    if (!existingGenre.isActive()) throw new GenreIsNotActive("Genre is not active");

    const updatedGenre = new Genre(
      genreId,
      new GenreName(genre.name ?? existingGenre.name.value),
      new GenreDescription(genre.description ?? existingGenre.description.value),
      new GenreCreatedAt(existingGenre.createdAt.value),
      new GenreUpdatedAt(now),
      new GenreDeletedAt(null),
    );

    return await this.repository.save(updatedGenre);
  }
}
