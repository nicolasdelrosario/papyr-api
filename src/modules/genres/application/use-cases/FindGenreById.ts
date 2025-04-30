import { GenreWasNotFound } from "@genres/domain/exceptions/GenreWasNotFound";
import type { Genre } from "@genres/domain/model/Genre";
import type { GenreRepository } from "@genres/domain/repository/GenreRepository";
import { GenreId } from "@genres/domain/value-objects/GenreId";

export class FindGenreById {
  constructor(private readonly repository: GenreRepository) {}

  async execute(id: string): Promise<Genre> {
    const genre = await this.repository.findById(new GenreId(id));

    if (!genre) throw new GenreWasNotFound("Genre was not found.");

    return genre;
  }
}
