import type { Publisher } from "@publishers/domain/model/Publisher";
import type { PublisherRepository } from "@publishers/domain/repository/PublisherRepository";

export class ListPublishers {
  constructor(private readonly repository: PublisherRepository) {}

  async execute(): Promise<Publisher[]> {
    const publishers = await this.repository.list();

    return publishers;
  }
}
