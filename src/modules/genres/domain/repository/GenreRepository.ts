import type { Genre } from "@genres/domain/model/Genre";
import type { GenreId } from "@genres/domain/value-objects/GenreId";

export interface GenreRepository {
  list(): Promise<Genre[]>;
  findById(id: GenreId): Promise<Genre | null>;
  save(genre: Genre): Promise<void>;
  delete(id: GenreId): Promise<void>;
}
