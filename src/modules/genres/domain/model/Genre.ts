import type { GenreCreatedAt } from "@genres/domain/value-objects/GenreCreatedAt";
import { GenreDeletedAt } from "@genres/domain/value-objects/GenreDeletedAt";
import type { GenreDescription } from "@genres/domain/value-objects/GenreDescription";
import type { GenreId } from "@genres/domain/value-objects/GenreId";
import type { GenreName } from "@genres/domain/value-objects/GenreName";
import type { GenreUpdatedAt } from "@genres/domain/value-objects/GenreUpdatedAt";

export class Genre {
  id: GenreId;
  name: GenreName;
  description: GenreDescription;
  createdAt: GenreCreatedAt;
  updatedAt: GenreUpdatedAt;
  deletedAt: GenreDeletedAt;

  constructor(
    id: GenreId,
    name: GenreName,
    description: GenreDescription,
    createdAt: GenreCreatedAt,
    updatedAt: GenreUpdatedAt,
    deletedAt: GenreDeletedAt,
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      deletedAt: this.deletedAt.value,
    };
  }

  isActive(): boolean {
    return this.deletedAt.value === null;
  }

  remove(): void {
    this.deletedAt = new GenreDeletedAt(new Date());
  }

  restore(): void {
    this.deletedAt = new GenreDeletedAt(null);
  }
}
