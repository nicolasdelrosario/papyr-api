import type { Book } from "@/modules/books/domain/model/Book";
import type { Genre } from "@/modules/genres/domain/model/Genre";
import type { GenreId } from "@/modules/genres/domain/value-objects/GenreId";
import type { BookGenre } from "@bookGenres/domain/model/BookGenre";
import type { BookGenreId } from "@bookGenres/domain/value-objects/BookGenreId";
import type { BookId } from "@books/domain/value-objects/BookId";

export interface BookGenreRepository {
  listBooksByGenreId(genreId: GenreId): Promise<Book[]>;
  listGenresByBookId(bookId: BookId): Promise<Genre[]>;
  list(): Promise<BookGenre[]>;
  findById(id: BookGenreId): Promise<BookGenre | null>;
  save(bookGenre: BookGenre): Promise<void>;
  delete(id: BookGenreId): Promise<void>;
}
