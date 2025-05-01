import { AuthorIsNotActive } from "@/modules/authors/domain/exceptions/AuthorIsNotActive";
import { AuthorWasNotFound } from "@/modules/authors/domain/exceptions/AuthorWasNotFound";
import type { Author } from "@/modules/authors/domain/model/Author";
import type { AuthorRepository } from "@/modules/authors/domain/repository/AuthorRepository";
import { BookIsNotActive } from "@books/domain/exceptions/BookIsNotActive";
import { BookWasNotFound } from "@books/domain/exceptions/BookWasNotFound";
import type { Book } from "@books/domain/model/Book";
import type { BookRepository } from "@books/domain/repository/BookRepository";
import { BookId } from "@books/domain/value-objects/BookId";

export class FindBookById {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorRepository: AuthorRepository,
  ) {}

  async execute(id: string): Promise<{ book: Book; author: Author }> {
    const book = await this.bookRepository.findById(new BookId(id));

    if (!book) throw new BookWasNotFound("Book was not found.");

    if (!book.isActive()) throw new BookIsNotActive("Book is not active.");

    const author = await this.authorRepository.findById(book.authorId);

    if (!author) throw new AuthorWasNotFound("Author was not found.");

    if (!author.isActive()) throw new AuthorIsNotActive("Author is not active.");

    return { book, author };
  }
}
