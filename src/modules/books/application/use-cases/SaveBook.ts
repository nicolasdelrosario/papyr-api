import { AuthorWasNotFound } from "@/modules/authors/domain/exceptions/AuthorWasNotFound";
import type { AuthorRepository } from "@/modules/authors/domain/repository/AuthorRepository";
import { AuthorId } from "@/modules/authors/domain/value-objects/AuthorId";
import { PublisherWasNotFound } from "@/modules/publishers/domain/exceptions/PublisherWasNotFound";
import type { PublisherRepository } from "@/modules/publishers/domain/repository/PublisherRepository";
import { PublisherId } from "@/modules/publishers/domain/value-objects/PublisherId";
import type { SaveBookDto } from "@books/application/dtos/SaveBookDto";
import { BookIsNotActive } from "@books/domain/exceptions/BookIsNotActive";
import { Book } from "@books/domain/model/Book";
import type { BookRepository } from "@books/domain/repository/BookRepository";
import { BookCoverUrl } from "@books/domain/value-objects/BookCoverUrl";
import { BookCreatedAt } from "@books/domain/value-objects/BookCreatedAt";
import { BookDeletedAt } from "@books/domain/value-objects/BookDeletedAt";
import { BookDescription } from "@books/domain/value-objects/BookDescription";
import { BookId } from "@books/domain/value-objects/BookId";
import { BookIsbn } from "@books/domain/value-objects/BookIsbn";
import { BookLanguage } from "@books/domain/value-objects/BookLanguage";
import { BookPages } from "@books/domain/value-objects/BookPages";
import { BookPublicationDate } from "@books/domain/value-objects/BookPublicationDate";
import { BookTitle } from "@books/domain/value-objects/BookTitle";
import { BookUpdatedAt } from "@books/domain/value-objects/BookUpdatedAt";

export class SaveBook {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly authorRepository: AuthorRepository,
    private readonly publisherRepository: PublisherRepository,
  ) {}

  async execute(book: SaveBookDto): Promise<void> {
    const now = new Date();
    const isUpdate = book.id !== undefined && book.id !== null;

    const author = await this.authorRepository.findById(new AuthorId(book.authorId));
    if (!author) throw new AuthorWasNotFound("Author was not found");

    const publisher = await this.publisherRepository.findById(new PublisherId(book.publisherId));
    if (!publisher) throw new PublisherWasNotFound("Publisher was not found");

    if (isUpdate) {
      const bookId = new BookId(book.id);
      const existingBook = await this.bookRepository.findById(bookId);

      if (!existingBook) throw new Error("Book was not found");
      if (!existingBook.isActive()) throw new BookIsNotActive("Book is not active");

      const updatedBook = new Book(
        bookId,
        new AuthorId(book.authorId ?? existingBook.authorId.value),
        new PublisherId(book.publisherId ?? existingBook.publisherId.value),
        new BookTitle(book.title ?? existingBook.title.value),
        new BookDescription(book.description ?? existingBook.description.value),
        new BookIsbn(book.isbn ?? existingBook.isbn.value),
        new BookPublicationDate(
          book.publicationDate ? new Date(book.publicationDate) : existingBook.publicationDate.value,
        ),
        new BookCoverUrl(book.coverUrl ?? existingBook.coverUrl.value),
        new BookPages(book.pages ?? existingBook.pages.value),
        new BookLanguage(book.language ?? existingBook.language.value),
        new BookCreatedAt(existingBook.createdAt.value),
        new BookUpdatedAt(now),
        new BookDeletedAt(existingBook.deletedAt.value),
      );

      return await this.bookRepository.save(updatedBook);
    }

    const bookId = new BookId(crypto.randomUUID());

    const newBook = new Book(
      bookId,
      new AuthorId(book.authorId),
      new PublisherId(book.publisherId),
      new BookTitle(book.title),
      new BookDescription(book.description ?? null),
      new BookIsbn(book.isbn ?? null),
      new BookPublicationDate(new Date(book.publicationDate)),
      new BookCoverUrl(book.coverUrl ?? null),
      new BookPages(book.pages),
      new BookLanguage(book.language),
      new BookCreatedAt(now),
      new BookUpdatedAt(now),
      new BookDeletedAt(null),
    );

    return await this.bookRepository.save(newBook);
  }
}
