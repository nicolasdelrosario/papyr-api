import { AuthorIsNotActive } from "@authors/domain/exceptions/AuthorIsNotActive";
import { AuthorWasNotFound } from "@authors/domain/exceptions/AuthorWasNotFound";
import type { AuthorRepository } from "@authors/domain/repository/AuthorRepository";
import { AuthorId } from "@authors/domain/value-objects/AuthorId";

export class SoftDeleteAuthor {
  constructor(private readonly repository: AuthorRepository) {}

  async execute(id: string): Promise<void> {
    const authorId = new AuthorId(id);
    const author = await this.repository.findById(authorId);

    if (!author) throw new AuthorWasNotFound("Author was not found");

    if (!author.isActive()) throw new AuthorIsNotActive("Author is not active already");

    author.remove();

    await this.repository.save(author);
  }
}
