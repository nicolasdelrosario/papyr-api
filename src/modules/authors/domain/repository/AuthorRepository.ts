import type { Author } from "@authors/domain/model/Author";
import type { AuthorId } from "@authors/domain/value-objects/AuthorId";

export interface AuthorRepository {
  list(): Promise<Author[]>;
  findById(id: AuthorId): Promise<Author | null>;
  save(author: Author): Promise<void>;
  delete(id: AuthorId): Promise<void>;
}
