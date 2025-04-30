import { GenreIsActive } from "@genres/domain/exceptions/GenreIsActive";
import { GenreWasNotFound } from "@genres/domain/exceptions/GenreWasNotFound";
import type { GenreRepository } from "@genres/domain/repository/GenreRepository";
import { GenreId } from "@genres/domain/value-objects/GenreId";

export class DeleteGenre {
  constructor(private readonly repository: GenreRepository) {}

  async execute(id: string) {
    const genreId = new GenreId(id);
    const genre = await this.repository.findById(genreId);

    if (!genre) throw new GenreWasNotFound("Genre was not found");

    if (genre.isActive()) throw new GenreIsActive("Genre is active, cannot be deleted");

    await this.repository.delete(genreId);
  }
}
