import type { Genre } from "@genres/domain/model/Genre";
import type { GenreRepository } from "@genres/domain/repository/GenreRepository";

export class ListGenres {
  constructor(private readonly repository: GenreRepository) {}

  async execute(): Promise<Genre[]> {
    const genres = await this.repository.list();

    return genres;
  }
}
