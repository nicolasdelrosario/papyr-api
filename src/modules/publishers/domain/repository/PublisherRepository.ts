import type { Publisher } from "@publishers/domain/model/Publisher";
import type { PublisherId } from "@publishers/domain/value-objects/PublisherId";

export interface PublisherRepository {
  list(): Promise<Publisher[]>;
  findById(id: PublisherId): Promise<Publisher | null>;
  save(publisher: Publisher): Promise<void>;
  delete(id: PublisherId): Promise<void>;
}
