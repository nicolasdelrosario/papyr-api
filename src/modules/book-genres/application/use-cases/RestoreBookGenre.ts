import { BookGenreIsActive } from "@bookGenres/domain/exceptions/BookGenreIsActive";
import { BookGenreWasNotFound } from "@bookGenres/domain/exceptions/BookGenreWasNotFound";
import type { BookGenreRepository } from "@bookGenres/domain/repository/BookGenreRepository";
import { BookGenreId } from "@bookGenres/domain/value-objects/BookGenreId";

export class RestoreBookGenre {
  constructor(private readonly repository: BookGenreRepository) {}

  async execute(id: string) {
    const bookGenreId = new BookGenreId(id);
    const bookGenre = await this.repository.findById(bookGenreId);

    if (!bookGenre) throw new BookGenreWasNotFound("Book genre relationship was not found");

    if (bookGenre.isActive()) throw new BookGenreIsActive("Book genre relationship is already active");

    bookGenre.restore();

    await this.repository.save(bookGenre);
  }
}
