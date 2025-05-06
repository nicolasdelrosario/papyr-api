import type { BookGenre } from "@bookGenres/domain/model/BookGenre";
import type { BookGenreRepository } from "@bookGenres/domain/repository/BookGenreRepository";

export class ListBookGenres {
  constructor(private readonly repository: BookGenreRepository) {}

  async execute(): Promise<BookGenre[]> {
    const bookGenres = await this.repository.list();

    return bookGenres;
  }
}
