import { GenreWasNotFound } from "@genres/domain/exceptions/GenreWasNotFound";
import type { GenreRepository } from "@genres/domain/repository/GenreRepository";
import { GenreId } from "@genres/domain/value-objects/GenreId";

export class DeleteGenre {
  constructor(private readonly repository: GenreRepository) {}

  async execute(id: string) {
    const genreId = new GenreId(id);
    const genre = await this.repository.findById(genreId);

    if (!genre) throw new GenreWasNotFound("Genre was not found");

    await this.repository.delete(genreId);
  }
}
