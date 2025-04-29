import type { Author } from "@authors/domain/model/Author";
import type { AuthorRepository } from "@authors/domain/repository/AuthorRepository";

export class ListAuthors {
  constructor(private readonly repository: AuthorRepository) {}

  async execute(): Promise<Author[]> {
    const authors = await this.repository.list();

    return authors;
  }
}
