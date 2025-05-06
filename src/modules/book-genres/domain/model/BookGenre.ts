import type { GenreId } from "@/modules/genres/domain/value-objects/GenreId";
import type { BookGenreCreatedAt } from "@bookGenres/domain/value-objects/BookGenreCreatedAt";
import { BookGenreDeletedAt } from "@bookGenres/domain/value-objects/BookGenreDeletedAt";
import type { BookGenreId } from "@bookGenres/domain/value-objects/BookGenreId";
import type { BookGenreUpdatedAt } from "@bookGenres/domain/value-objects/BookGenreUpdatedAt";
import type { BookId } from "@books/domain/value-objects/BookId";

export class BookGenre {
  id: BookGenreId;
  bookId: BookId;
  genreId: GenreId;
  createdAt: BookGenreCreatedAt;
  updatedAt: BookGenreUpdatedAt;
  deletedAt: BookGenreDeletedAt;

  constructor(
    id: BookGenreId,
    bookId: BookId,
    genreId: GenreId,
    createdAt: BookGenreCreatedAt,
    updatedAt: BookGenreUpdatedAt,
    deletedAt: BookGenreDeletedAt,
  ) {
    this.id = id;
    this.bookId = bookId;
    this.genreId = genreId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      bookId: this.bookId.value,
      genreId: this.genreId.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      deletedAt: this.deletedAt.value,
    };
  }

  isActive(): boolean {
    return this.deletedAt.value === null;
  }

  softDelete(): void {
    this.deletedAt = new BookGenreDeletedAt(new Date());
  }

  restore(): void {
    this.deletedAt = new BookGenreDeletedAt(null);
  }
}
