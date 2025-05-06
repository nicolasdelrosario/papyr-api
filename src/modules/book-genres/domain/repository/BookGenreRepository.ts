import type { GenreId } from "@/modules/genres/domain/value-objects/GenreId";
import type { BookGenre } from "@bookGenres/domain/model/BookGenre";
import type { BookGenreId } from "@bookGenres/domain/value-objects/BookGenreId";
import type { BookId } from "@books/domain/value-objects/BookId";

export interface BookGenreRepository {
  listBooksByGenreId(genreId: GenreId): Promise<BookGenre[]>;
  listGenresByBookId(bookId: BookId): Promise<BookGenre[]>;
  list: Promise<BookGenre[]>;
  findById(id: BookGenreId): Promise<BookGenre | null>;
  save(bookGenre: BookGenre): Promise<void>;
  delete(id: BookGenreId): Promise<void>;
  softDelete(id: BookGenreId): Promise<void>;
  restore(id: BookGenreId): Promise<void>;
}
