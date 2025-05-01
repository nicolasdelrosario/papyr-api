import { BookIsActive } from "@books/domain/exceptions/BookIsActive";
import { BookWasNotFound } from "@books/domain/exceptions/BookWasNotFound";
import type { BookRepository } from "@books/domain/repository/BookRepository";
import { BookId } from "@books/domain/value-objects/BookId";

export class RestoreBook {
  constructor(private readonly repository: BookRepository) {}

  async execute(id: string): Promise<void> {
    const bookId = new BookId(id);
    const book = await this.repository.findById(bookId);

    if (!book) throw new BookWasNotFound("Book was not found");

    if (book.isActive()) throw new BookIsActive("Book is already active");

    book.restore();

    await this.repository.save(book);
  }
}
