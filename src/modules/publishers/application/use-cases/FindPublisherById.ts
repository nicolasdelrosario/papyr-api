import { PublisherIsNotActive } from "@publishers/domain/exceptions/PublisherIsNotActive";
import { PublisherWasNotFound } from "@publishers/domain/exceptions/PublisherWasNotFound";
import type { Publisher } from "@publishers/domain/model/Publisher";
import type { PublisherRepository } from "@publishers/domain/repository/PublisherRepository";
import { PublisherId } from "@publishers/domain/value-objects/PublisherId";

export class FindPublisherById {
  constructor(private readonly repository: PublisherRepository) {}

  async execute(id: string): Promise<Publisher> {
    const publisher = await this.repository.findById(new PublisherId(id));

    if (!publisher) throw new PublisherWasNotFound("Publisher was not found.");

    if (!publisher.isActive()) throw new PublisherIsNotActive("Publisher is not active.");

    return publisher;
  }
}
