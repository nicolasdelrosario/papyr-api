import type { Book } from "@books/domain/model/Book";
import type { BookId } from "@books/domain/value-objects/BookId";

export interface BookRepository {
  list(): Promise<Book[]>;
  findById(id: BookId): Promise<Book | null>;
  save(book: Book): Promise<void>;
  delete(id: BookId): Promise<void>;
}
