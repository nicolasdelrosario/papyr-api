import { AuthorId } from "@/modules/authors/domain/value-objects/AuthorId";
import type { BookDTO } from "@/modules/books/application/dtos/BookDto";
import { Book } from "@/modules/books/domain/model/Book";
import { BookCoverUrl } from "@/modules/books/domain/value-objects/BookCoverUrl";
import { BookCreatedAt } from "@/modules/books/domain/value-objects/BookCreatedAt";
import { BookDeletedAt } from "@/modules/books/domain/value-objects/BookDeletedAt";
import { BookDescription } from "@/modules/books/domain/value-objects/BookDescription";
import { BookIsbn } from "@/modules/books/domain/value-objects/BookIsbn";
import { BookLanguage } from "@/modules/books/domain/value-objects/BookLanguage";
import { BookPages } from "@/modules/books/domain/value-objects/BookPages";
import { BookPublicationDate } from "@/modules/books/domain/value-objects/BookPublicationDate";
import { BookTitle } from "@/modules/books/domain/value-objects/BookTitle";
import { BookUpdatedAt } from "@/modules/books/domain/value-objects/BookUpdatedAt";
import { zodBookSchema } from "@/modules/books/infrastructure/schemas/zodBookSchema";
import type { GenreDTO } from "@/modules/genres/application/dtos/GenreDto";
import { Genre } from "@/modules/genres/domain/model/Genre";
import { GenreCreatedAt } from "@/modules/genres/domain/value-objects/GenreCreatedAt";
import { GenreDeletedAt } from "@/modules/genres/domain/value-objects/GenreDeletedAt";
import { GenreDescription } from "@/modules/genres/domain/value-objects/GenreDescription";
import { GenreName } from "@/modules/genres/domain/value-objects/GenreName";
import { GenreUpdatedAt } from "@/modules/genres/domain/value-objects/GenreUpdatedAt";
import { zodGenreSchema } from "@/modules/genres/infrastructure/schemas/zodGenreSchema";
import { PublisherId } from "@/modules/publishers/domain/value-objects/PublisherId";
import type { BookGenreDTO } from "@bookGenres/application/dtos/BookGenreDto";
import { BookGenre } from "@bookGenres/domain/model/BookGenre";
import type { BookGenreRepository } from "@bookGenres/domain/repository/BookGenreRepository";
import { BookGenreCreatedAt } from "@bookGenres/domain/value-objects/BookGenreCreatedAt";
import { BookGenreDeletedAt } from "@bookGenres/domain/value-objects/BookGenreDeletedAt";
import { BookGenreId } from "@bookGenres/domain/value-objects/BookGenreId";
import { BookGenreUpdatedAt } from "@bookGenres/domain/value-objects/BookGenreUpdatedAt";
import { zodBookGenreSchema } from "@bookGenres/infrastructure/schemas/zodBookGenreSchema";
import { BookId } from "@books/domain/value-objects/BookId";
import { GenreId } from "@genres/domain/value-objects/GenreId";

export class D1BookGenreRepository implements BookGenreRepository {
  constructor(private readonly db: D1Database) {}

  async list(): Promise<BookGenre[]> {
    const { results } = await this.db
      .prepare(
        `
        SELECT * FROM book_genres WHERE deleted_at IS NULL
      `,
      )
      .all<BookGenreDTO>();
    return results.map((row) => this.mapBookGenreToDomain(row));
  }

  async listBooksByGenreId(genreId: GenreId): Promise<Book[]> {
    const { results } = await this.db
      .prepare(
        `
        SELECT DISTINCT
           b.id, b.author_id, b.publisher_id, b.title, b.description,
           b.isbn, b.publication_date, b.cover_url, b.pages,
           b.language, b.created_at, b.updated_at, b.deleted_at
         FROM book_genres bg
         INNER JOIN books b ON b.id = bg.book_id
         WHERE bg.genre_id = ?
           AND b.deleted_at IS NULL
           AND bg.deleted_at IS NULL
       `,
      )
      .bind(genreId.value)
      .all<BookDTO>();

    return results.map((row) => this.mapBookToDomain(row));
  }

  async listGenresByBookId(bookId: BookId): Promise<Genre[]> {
    const { results } = await this.db
      .prepare(
        `
        SELECT DISTINCT
          g.id, g.name, g.description, g.created_at, g.updated_at, g.deleted_at
        FROM book_genres bg
        INNER JOIN genres g ON g.id = bg.genre_id
        WHERE bg.book_id = ?
          AND g.deleted_at IS NULL
          AND bg.deleted_at IS NULL
      `,
      )
      .bind(bookId.value)
      .all<GenreDTO>();

    return results.map((row) => this.mapGenreToDomain(row));
  }

  async findById(id: BookGenreId): Promise<BookGenre | null> {
    const row = await this.db.prepare("SELECT * FROM book_genres WHERE id = ?").bind(id.value).first<BookGenreDTO>();

    return row ? this.mapBookGenreToDomain(row) : null;
  }

  async save(bookGenre: BookGenre): Promise<void> {
    await this.db
      .prepare(
        `
        INSERT INTO book_genres (
          id,
          book_id,
          genre_id,
          created_at,
          updated_at,
          deleted_at
        )
        VALUES (
          ?, ?, ?, ?, ?, ?
        )
        ON CONFLICT(id) DO UPDATE SET
          book_id = excluded.book_id,
          genre_id = excluded.genre_id,
          updated_at = excluded.updated_at,
          deleted_at = excluded.deleted_at
        `,
      )
      .bind(
        bookGenre.id.value,
        bookGenre.bookId.value,
        bookGenre.genreId.value,
        bookGenre.createdAt.value.toISOString(),
        bookGenre.updatedAt.value.toISOString(),
        bookGenre.deletedAt.value ? bookGenre.deletedAt.value.toISOString() : null,
      )
      .run();
  }

  async delete(id: BookGenreId): Promise<void> {
    await this.db.prepare("DELETE FROM book_genres WHERE id = ?").bind(id.value).run();
  }

  private mapBookGenreToDomain(row: BookGenreDTO): BookGenre {
    const parsed = zodBookGenreSchema.parse(row);

    return new BookGenre(
      new BookGenreId(parsed.id),
      new BookId(parsed.bookId),
      new GenreId(parsed.genreId),
      new BookGenreCreatedAt(parsed.createdAt),
      new BookGenreUpdatedAt(parsed.updatedAt),
      new BookGenreDeletedAt(parsed.deletedAt),
    );
  }

  private mapBookToDomain(row: BookDTO): Book {
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

  private mapGenreToDomain(row: GenreDTO): Genre {
    const parsed = zodGenreSchema.parse(row);

    return new Genre(
      new GenreId(parsed.id),
      new GenreName(parsed.name),
      new GenreDescription(parsed.description),
      new GenreCreatedAt(parsed.createdAt),
      new GenreUpdatedAt(parsed.updatedAt),
      new GenreDeletedAt(parsed.deletedAt),
    );
  }
}
