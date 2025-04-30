import type { SaveGenreDto } from "@genres/application/dtos/SaveGenreDto";
import { Genre } from "@genres/domain/model/Genre";
import type { GenreRepository } from "@genres/domain/repository/GenreRepository";
import { GenreDescription } from "@genres/domain/value-objects/GenreDescription";
import { GenreId } from "@genres/domain/value-objects/GenreId";
import { GenreName } from "@genres/domain/value-objects/GenreName";

export class SaveGenre {
  constructor(private readonly repository: GenreRepository) {}

  async execute(genre: SaveGenreDto): Promise<void> {
    const genreId = genre.id ? new GenreId(genre.id) : new GenreId(crypto.randomUUID());

    const existingGenre = await this.repository.findById(genreId);

    if (!existingGenre) {
      const newGenre = new Genre(genreId, new GenreName(genre.name), new GenreDescription(genre.description));

      return await this.repository.save(newGenre);
    }

    if (existingGenre) {
      const updatedGenre = new Genre(
        genreId,
        new GenreName(genre.name ?? existingGenre.name.value),
        new GenreDescription(genre.description ?? existingGenre.description.value),
      );

      return await this.repository.save(updatedGenre);
    }
  }
}
