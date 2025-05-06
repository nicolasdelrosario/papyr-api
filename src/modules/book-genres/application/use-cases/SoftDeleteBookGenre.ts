import { BookGenreIsNotActive } from "@bookGenres/domain/exceptions/BookGenreIsNotActive";
import { BookGenreWasNotFound } from "@bookGenres/domain/exceptions/BookGenreWasNotFound";
import type { BookGenreRepository } from "@bookGenres/domain/repository/BookGenreRepository";
import { BookGenreId } from "@bookGenres/domain/value-objects/BookGenreId";

export class SoftDeleteBookGenre {
  constructor(private readonly repository: BookGenreRepository) {}

  async execute(id: string): Promise<void> {
    const bookGenreId = new BookGenreId(id);
    const bookGenre = await this.repository.findById(bookGenreId);

    if (!bookGenre) throw new BookGenreWasNotFound("Book genre relationship was not found");

    if (!bookGenre.isActive()) throw new BookGenreIsNotActive("Book genre relationship is not active");

    bookGenre.softDelete();

    await this.repository.save(bookGenre);
  }
}
