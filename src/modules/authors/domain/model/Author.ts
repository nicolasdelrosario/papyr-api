import type { AuthorBiography } from "@authors/domain/value-objects/AuthorBiography";
import type { AuthorBirthDate } from "@authors/domain/value-objects/AuthorBirthDate";
import type { AuthorCreatedAt } from "@authors/domain/value-objects/AuthorCreatedAt";
import type { AuthorDeathDate } from "@authors/domain/value-objects/AuthorDeathDate";
import { AuthorDeletedAt } from "@authors/domain/value-objects/AuthorDeletedAt";
import type { AuthorId } from "@authors/domain/value-objects/AuthorId";
import type { AuthorName } from "@authors/domain/value-objects/AuthorName";
import type { AuthorNationality } from "@authors/domain/value-objects/AuthorNationality";
import type { AuthorPhotoUrl } from "@authors/domain/value-objects/AuthorPhotoUrl";
import type { AuthorUpdatedAt } from "@authors/domain/value-objects/AuthorUpdatedAt";

export class Author {
  id: AuthorId;
  name: AuthorName;
  biography: AuthorBiography;
  birthDate: AuthorBirthDate;
  deathDate: AuthorDeathDate;
  nationality: AuthorNationality;
  photoUrl: AuthorPhotoUrl;
  createdAt: AuthorCreatedAt;
  updatedAt: AuthorUpdatedAt;
  deletedAt: AuthorDeletedAt;

  constructor(
    id: AuthorId,
    name: AuthorName,
    biography: AuthorBiography,
    birthDate: AuthorBirthDate,
    deathDate: AuthorDeathDate,
    nationality: AuthorNationality,
    photoUrl: AuthorPhotoUrl,
    createdAt: AuthorCreatedAt,
    updatedAt: AuthorUpdatedAt,
    deletedAt: AuthorDeletedAt,
  ) {
    this.id = id;
    this.name = name;
    this.biography = biography;
    this.birthDate = birthDate;
    this.deathDate = deathDate;
    this.nationality = nationality;
    this.photoUrl = photoUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      biography: this.biography.value,
      birthDate: this.birthDate.value,
      deathDate: this.deathDate.value,
      nationality: this.nationality.value,
      photoUrl: this.photoUrl.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      deletedAt: this.deletedAt.value,
    };
  }

  isActive(): boolean {
    return this.deletedAt.value === null;
  }

  remove(): void {
    this.deletedAt = new AuthorDeletedAt(new Date());
  }

  restore(): void {
    this.deletedAt = new AuthorDeletedAt(null);
  }
}
