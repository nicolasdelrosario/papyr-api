import { GenreIsNotActive } from "@genres/domain/exceptions/GenreIsNotActive";
import { GenreWasNotFound } from "@genres/domain/exceptions/GenreWasNotFound";
import type { GenreRepository } from "@genres/domain/repository/GenreRepository";
import { GenreId } from "@genres/domain/value-objects/GenreId";

export class SoftDeleteGenre {
  constructor(private readonly repository: GenreRepository) {}

  async execute(id: string): Promise<void> {
    const genreId = new GenreId(id);
    const genre = await this.repository.findById(genreId);

    if (!genre) throw new GenreWasNotFound("Genre was not found");

    if (!genre.isActive()) throw new GenreIsNotActive("Genre is not active already");

    genre.remove();

    await this.repository.save(genre);
  }
}
