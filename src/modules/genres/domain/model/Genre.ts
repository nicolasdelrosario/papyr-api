import type { GenreDescription } from "@genres/domain/value-objects/GenreDescription";
import type { GenreId } from "@genres/domain/value-objects/GenreId";
import type { GenreName } from "@genres/domain/value-objects/GenreName";

export class Genre {
  id: GenreId;
  name: GenreName;
  description: GenreDescription;

  constructor(id: GenreId, name: GenreName, description: GenreDescription) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      description: this.description.value,
    };
  }
}
