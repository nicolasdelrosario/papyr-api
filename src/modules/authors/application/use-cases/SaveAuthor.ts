import type { SaveAuthorDto } from "@authors/application/dtos/SaveAuthorDto";
import { AuthorIsNotActive } from "@authors/domain/exceptions/AuthorIsNotActive";
import { Author } from "@authors/domain/model/Author";
import type { AuthorRepository } from "@authors/domain/repository/AuthorRepository";
import { AuthorBiography } from "@authors/domain/value-objects/AuthorBiography";
import { AuthorBirthDate } from "@authors/domain/value-objects/AuthorBirthDate";
import { AuthorCreatedAt } from "@authors/domain/value-objects/AuthorCreatedAt";
import { AuthorDeathDate } from "@authors/domain/value-objects/AuthorDeathDate";
import { AuthorDeletedAt } from "@authors/domain/value-objects/AuthorDeletedAt";
import { AuthorId } from "@authors/domain/value-objects/AuthorId";
import { AuthorName } from "@authors/domain/value-objects/AuthorName";
import { AuthorNationality } from "@authors/domain/value-objects/AuthorNationality";
import { AuthorPhotoUrl } from "@authors/domain/value-objects/AuthorPhotoUrl";
import { AuthorUpdatedAt } from "@authors/domain/value-objects/AuthorUpdatedAt";
import { AuthorWasNotFound } from "../../domain/exceptions/AuthorWasNotFound";

export class SaveAuthor {
  constructor(private readonly repository: AuthorRepository) {}

  async execute(author: SaveAuthorDto): Promise<void> {
    const now = new Date();
    const isUpdate = author.id !== undefined && author.id !== null;

    if (isUpdate) {
      const authorId = new AuthorId(author.id);
      const existingAuthor = await this.repository.findById(authorId);

      if (!existingAuthor) throw new AuthorWasNotFound("Author was not found");

      if (!existingAuthor.isActive()) throw new AuthorIsNotActive("Author is not active");

      const updatedAuthor = new Author(
        authorId,
        new AuthorName(author.name ?? existingAuthor.name.value),
        new AuthorBiography(author.biography ?? existingAuthor.biography.value),
        new AuthorBirthDate(author.birth_date ? new Date(author.birth_date) : existingAuthor.birthDate.value),
        new AuthorDeathDate(author.death_date ? new Date(author.death_date) : existingAuthor.deathDate.value),
        new AuthorNationality(author.nationality ?? existingAuthor.nationality.value),
        new AuthorPhotoUrl(author.photo_url ?? existingAuthor.photoUrl.value),
        new AuthorCreatedAt(existingAuthor.createdAt.value),
        new AuthorUpdatedAt(now),
        new AuthorDeletedAt(existingAuthor.deletedAt.value),
      );

      return await this.repository.save(updatedAuthor);
    }

    const authorId = new AuthorId(crypto.randomUUID());

    const newAuthor = new Author(
      authorId,
      new AuthorName(author.name),
      new AuthorBiography(author.biography ?? null),
      new AuthorBirthDate(new Date(author.birth_date)),
      new AuthorDeathDate(author.death_date ? new Date(author.death_date) : null),
      new AuthorNationality(author.nationality ?? null),
      new AuthorPhotoUrl(author.photo_url ?? null),
      new AuthorCreatedAt(now),
      new AuthorUpdatedAt(now),
      new AuthorDeletedAt(null),
    );

    return await this.repository.save(newAuthor);
  }
}
