import { AuthorId } from "@/modules/authors/domain/value-objects/AuthorId";
import { PublisherId } from "@/modules/publishers/domain/value-objects/PublisherId";
import type { BookDTO } from "@books/application/dtos/BookDto";
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
import { zodBookSchema } from "@books/infrastructure/schemas/zodBookSchema";

export class D1BookRepository implements BookRepository {
  constructor(private readonly db: D1Database) {}

  async list(): Promise<Book[]> {
    const { results } = await this.db.prepare("SELECT * FROM books WHERE deleted_at IS NULL").all<BookDTO>();

    return results.map((row) => this.mapToDomain(row));
  }

  async findById(id: BookId): Promise<Book | null> {
    const row = await this.db.prepare("SELECT * FROM books WHERE id = ?").bind(id.value).first<BookDTO>();

    return row ? this.mapToDomain(row) : null;
  }

  async save(book: Book): Promise<void> {
    await this.db
      .prepare(
        `
      INSERT INTO books (
        id,
        author_id,
        publisher_id,
        title,
        description,
        isbn,
        publication_date,
        cover_url,
        pages,
        language,
        created_at,
        updated_at,
        deleted_at
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
      )
      ON CONFLICT(id) DO UPDATE SET
        author_id         = excluded.author_id,
        publisher_id      = excluded.publisher_id,
        title             = excluded.title,
        description       = excluded.description,
        isbn              = excluded.isbn,
        publication_date  = excluded.publication_date,
        cover_url         = excluded.cover_url,
        pages             = excluded.pages,
        language          = excluded.language,
        updated_at        = excluded.updated_at,
        deleted_at        = excluded.deleted_at
      `,
      )
      .bind(
        book.id.value,
        book.authorId.value,
        book.publisherId.value,
        book.title.value,
        book.description.value,
        book.isbn.value,
        book.publicationDate.value.toISOString(),
        book.coverUrl.value,
        book.pages.value,
        book.language.value,
        book.createdAt.value.toISOString(),
        book.updatedAt.value.toISOString(),
        book.deletedAt.value ? book.deletedAt.value.toISOString() : null,
      )
      .run();
  }

  async delete(id: BookId): Promise<void> {
    await this.db.prepare("DELETE FROM books WHERE id = ?").bind(id.value).run();
  }

  private mapToDomain(row: BookDTO): Book {
    const parsed = zodBookSchema.parse(row);

    return new Book(
      new BookId(parsed.id),
      new AuthorId(parsed.authorId),
      new PublisherId(parsed.publisherId),
      new BookTitle(parsed.title),
      new BookDescription(parsed.description),
      new BookIsbn(parsed.isbn),
      new BookPublicationDate(parsed.publicationDate),
      new BookCoverUrl(parsed.coverUrl),
      new BookPages(parsed.pages),
      new BookLanguage(parsed.language),
      new BookCreatedAt(parsed.createdAt),
      new BookUpdatedAt(parsed.updatedAt),
      new BookDeletedAt(parsed.deletedAt),
    );
  }
}
