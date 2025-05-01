import type { Book } from "@books/domain/model/Book";
import type { BookRepository } from "@books/domain/repository/BookRepository";

export class ListBooks {
  constructor(private readonly repository: BookRepository) {}

  async execute(): Promise<Book[]> {
    const books = await this.repository.list();

    return books;
  }
}
