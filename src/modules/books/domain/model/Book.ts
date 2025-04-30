import type { AuthorId } from "@authors/domain/value-objects/AuthorId";
import type { BookCoverUrl } from "@books/domain/value-objects/BookCoverUrl";
import type { BookCreatedAt } from "@books/domain/value-objects/BookCreatedAt";
import { BookDeletedAt } from "@books/domain/value-objects/BookDeletedAt";
import type { BookDescription } from "@books/domain/value-objects/BookDescription";
import type { BookId } from "@books/domain/value-objects/BookId";
import type { BookIsbn } from "@books/domain/value-objects/BookIsbn";
import type { BookLanguage } from "@books/domain/value-objects/BookLanguage";
import type { BookPages } from "@books/domain/value-objects/BookPages";
import type { BookPublicationDate } from "@books/domain/value-objects/BookPublicationDate";
import type { BookTitle } from "@books/domain/value-objects/BookTitle";
import type { BookUpdatedAt } from "@books/domain/value-objects/BookUpdatedAt";
import type { PublisherId } from "@publishers/domain/value-objects/PublisherId";

export class Book {
  id: BookId;
  authorId: AuthorId;
  publisherId: PublisherId;
  title: BookTitle;
  description: BookDescription;
  isbn: BookIsbn;
  publicationDate: BookPublicationDate;
  coverUrl: BookCoverUrl;
  pages: BookPages;
  language: BookLanguage;
  createdAt: BookCreatedAt;
  updatedAt: BookUpdatedAt;
  deletedAt: BookDeletedAt;

  constructor(
    id: BookId,
    authorId: AuthorId,
    publisherId: PublisherId,
    title: BookTitle,
    description: BookDescription,
    isbn: BookIsbn,
    publicationDate: BookPublicationDate,
    coverUrl: BookCoverUrl,
    pages: BookPages,
    language: BookLanguage,
    createdAt: BookCreatedAt,
    updatedAt: BookUpdatedAt,
    deletedAt: BookDeletedAt,
  ) {
    this.id = id;
    this.authorId = authorId;
    this.publisherId = publisherId;
    this.title = title;
    this.description = description;
    this.isbn = isbn;
    this.publicationDate = publicationDate;
    this.coverUrl = coverUrl;
    this.pages = pages;
    this.language = language;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      authorId: this.authorId.value,
      publisherId: this.publisherId.value,
      title: this.title.value,
      description: this.description.value,
      isbn: this.isbn.value,
      publicationDate: this.publicationDate.value,
      coverUrl: this.coverUrl.value,
      pages: this.pages.value,
      language: this.language.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      deletedAt: this.deletedAt.value,
    };
  }

  isActive(): boolean {
    return this.deletedAt.value === null;
  }

  softDelete(): void {
    this.deletedAt = new BookDeletedAt(new Date());
  }

  restore(): void {
    this.deletedAt = new BookDeletedAt(null);
  }
}
