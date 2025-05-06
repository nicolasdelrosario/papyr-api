import { BookGenreIsNotActive } from "@bookGenres/domain/exceptions/BookGenreIsNotActive";
import { BookGenreWasNotFound } from "@bookGenres/domain/exceptions/BookGenreWasNotFound";
import type { BookGenre } from "@bookGenres/domain/model/BookGenre";
import type { BookGenreRepository } from "@bookGenres/domain/repository/BookGenreRepository";
import { BookGenreId } from "@bookGenres/domain/value-objects/BookGenreId";

export class FindBookGenreById {
  constructor(private readonly repository: BookGenreRepository) {}

  async execute(id: string): Promise<BookGenre> {
    const bookGenre = await this.repository.findById(new BookGenreId(id));

    if (!bookGenre) throw new BookGenreWasNotFound("Book genre relation was not found.");

    if (!bookGenre.isActive()) throw new BookGenreIsNotActive("Book genre relation is not active.");

    return bookGenre;
  }
}
