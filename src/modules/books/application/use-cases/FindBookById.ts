import { AuthorIsNotActive } from "@authors/domain/exceptions/AuthorIsNotActive";
import { AuthorWasNotFound } from "@authors/domain/exceptions/AuthorWasNotFound";
import type { AuthorRepository } from "@authors/domain/repository/AuthorRepository";
import type { FindBookByIdResponseDto } from "@books/application/dtos/FindBookByIdResponseDto";
import { BookIsNotActive } from "@books/domain/exceptions/BookIsNotActive";
import { BookWasNotFound } from "@books/domain/exceptions/BookWasNotFound";
import type { BookRepository } from "@books/domain/repository/BookRepository";
import { BookId } from "@books/domain/value-objects/BookId";
import { PublisherIsNotActive } from "@publishers/domain/exceptions/PublisherIsNotActive";
import { PublisherWasNotFound } from "@publishers/domain/exceptions/PublisherWasNotFound";
import type { PublisherRepository } from "@publishers/domain/repository/PublisherRepository";

export class FindBookById {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorRepository: AuthorRepository,
    private readonly publisherRepository: PublisherRepository,
  ) {}

  async execute(id: string): Promise<FindBookByIdResponseDto> {
    const book = await this.bookRepository.findById(new BookId(id));

    if (!book) throw new BookWasNotFound("Book was not found.");

    if (!book.isActive()) throw new BookIsNotActive("Book is not active.");

    const author = await this.authorRepository.findById(book.authorId);

    if (!author) throw new AuthorWasNotFound("Author was not found.");

    if (!author.isActive()) throw new AuthorIsNotActive("Author is not active.");

    const publisher = await this.publisherRepository.findById(book.publisherId);

    if (!publisher) throw new PublisherWasNotFound("Publisher was not found");

    if (!publisher.isActive()) throw new PublisherIsNotActive("Publisher is not active");

    const bookPrimitives = book.toPrimitives();
    const authorPrimitives = author.toPrimitives();
    const publisherPrimitives = publisher.toPrimitives();

    return {
      book: {
        ...bookPrimitives,
        author: {
          id: authorPrimitives.id,
          name: authorPrimitives.name,
        },
        publisher: {
          id: publisherPrimitives.id,
          name: publisherPrimitives.name,
        },
      },
    };
  }
}
