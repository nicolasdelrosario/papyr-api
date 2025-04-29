import { AuthorIsNotActive } from "@authors/domain/exceptions/AuthorIsNotActive";
import { AuthorWasNotFound } from "@authors/domain/exceptions/AuthorWasNotFound";
import type { Author } from "@authors/domain/model/Author";
import type { AuthorRepository } from "@authors/domain/repository/AuthorRepository";
import { AuthorId } from "@authors/domain/value-objects/AuthorId";

export class FindAuthorById {
  constructor(private readonly repository: AuthorRepository) {}

  async execute(id: string): Promise<Author> {
    const author = await this.repository.findById(new AuthorId(id));

    if (!author) throw new AuthorWasNotFound("Author was not found.");

    if (!author.isActive()) throw new AuthorIsNotActive("Author is not active.");

    return author;
  }
}
