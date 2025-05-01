import { BookIsNotActive } from "@books/domain/exceptions/BookIsNotActive";
import { BookWasNotFound } from "@books/domain/exceptions/BookWasNotFound";
import type { BookRepository } from "@books/domain/repository/BookRepository";
import { BookId } from "@books/domain/value-objects/BookId";

export class SoftDeleteBook {
  constructor(private readonly repository: BookRepository) {}

  async execute(id: string): Promise<void> {
    const bookId = new BookId(id);
    const book = await this.repository.findById(bookId);

    if (!book) throw new BookWasNotFound("Book was not found");

    if (!book.isActive()) throw new BookIsNotActive("Book is not active already");

    book.softDelete();

    await this.repository.save(book);
  }
}
