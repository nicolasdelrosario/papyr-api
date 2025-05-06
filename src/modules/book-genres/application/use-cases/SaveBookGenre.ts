import { BookWasNotFound } from "@/modules/books/domain/exceptions/BookWasNotFound";
import { GenreWasNotFound } from "@/modules/genres/domain/exceptions/GenreWasNotFound";
import { BookGenre } from "@bookGenres/domain/model/BookGenre";
import type { BookGenreRepository } from "@bookGenres/domain/repository/BookGenreRepository";
import { BookGenreCreatedAt } from "@bookGenres/domain/value-objects/BookGenreCreatedAt";
import { BookGenreDeletedAt } from "@bookGenres/domain/value-objects/BookGenreDeletedAt";
import { BookGenreId } from "@bookGenres/domain/value-objects/BookGenreId";
import { BookGenreUpdatedAt } from "@bookGenres/domain/value-objects/BookGenreUpdatedAt";
import type { BookRepository } from "@books/domain/repository/BookRepository";
import { BookId } from "@books/domain/value-objects/BookId";
import type { GenreRepository } from "@genres/domain/repository/GenreRepository";
import { GenreId } from "@genres/domain/value-objects/GenreId";
import { BookGenreIsNotActive } from "../../domain/exceptions/BookGenreIsNotActive";
import { BookGenreWasNotFound } from "../../domain/exceptions/BookGenreWasNotFound";
import type { SaveBookGenreDTO } from "../dtos/SaveBookGenreDto";

export class SaveBookGenre {
  constructor(
    private readonly bookGenreRepository: BookGenreRepository,
    private readonly bookRepository: BookRepository,
    private readonly genreRepository: GenreRepository,
  ) {}

  async execute(bookGenre: SaveBookGenreDTO): Promise<void> {
    const now = new Date();
    const isUpdate = bookGenre.id !== undefined && bookGenre.id !== null;

    const book = await this.bookRepository.findById(new BookId(bookGenre.bookId));
    if (!book) throw new BookWasNotFound("Book was not found");

    const genre = await this.genreRepository.findById(new GenreId(bookGenre.genreId));
    if (!genre) throw new GenreWasNotFound("Genre was not found");

    if (isUpdate) {
      const bookGenreId = new BookGenreId(bookGenre.id);
      const existingBookGenre = await this.bookGenreRepository.findById(bookGenreId);

      if (!existingBookGenre) throw new BookGenreWasNotFound("Book genre relationship was not found");
      if (!existingBookGenre.isActive()) throw new BookGenreIsNotActive("Book genre relationship is not active");

      const updatedBookGenre = new BookGenre(
        bookGenreId,
        new BookId(bookGenre.bookId ?? existingBookGenre.bookId.value),
        new GenreId(bookGenre.genreId ?? existingBookGenre.genreId.value),
        new BookGenreCreatedAt(existingBookGenre.createdAt.value),
        new BookGenreUpdatedAt(now),
        new BookGenreDeletedAt(existingBookGenre.deletedAt.value),
      );

      return await this.bookGenreRepository.save(updatedBookGenre);
    }

    const bookGenreId = new BookGenreId(crypto.randomUUID());

    const newBookGenre = new BookGenre(
      bookGenreId,
      new BookId(bookGenre.bookId),
      new GenreId(bookGenre.genreId),
      new BookGenreCreatedAt(now),
      new BookGenreUpdatedAt(now),
      new BookGenreDeletedAt(null),
    );

    return await this.bookGenreRepository.save(newBookGenre);
  }
}
