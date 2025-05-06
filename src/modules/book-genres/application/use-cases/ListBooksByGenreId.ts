import { GenreId } from "@/modules/genres/domain/value-objects/GenreId";
import type { BookGenre } from "@bookGenres/domain/model/BookGenre";
import type { BookGenreRepository } from "@bookGenres/domain/repository/BookGenreRepository";

export class ListBooksByGenreId {
  constructor(private readonly repository: BookGenreRepository) {}

  async execute(id: string): Promise<BookGenre[]> {
    const books = await this.repository.listBooksByGenreId(new GenreId(id));

    return books;
  }
}
