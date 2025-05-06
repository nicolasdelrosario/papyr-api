import type { BookGenre } from "@bookGenres/domain/model/BookGenre";
import type { BookGenreRepository } from "@bookGenres/domain/repository/BookGenreRepository";
import type { BookId } from "@books/domain/value-objects/BookId";

export class ListGenresByBookId {
  constructor(private readonly repository: BookGenreRepository) {}

  async execute(bookId: BookId): Promise<BookGenre[]> {
    const genres = await this.repository.listGenresByBookId(bookId);

    return genres;
  }
}
