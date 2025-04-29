import { PublisherIsActive } from "@publishers/domain/exceptions/PublisherIsActive";
import { PublisherWasNotFound } from "@publishers/domain/exceptions/PublisherWasNotFound";
import type { PublisherRepository } from "@publishers/domain/repository/PublisherRepository";
import { PublisherId } from "@publishers/domain/value-objects/PublisherId";

export class DeletePublisher {
  constructor(private readonly repository: PublisherRepository) {}

  async execute(id: string) {
    const publisherId = new PublisherId(id);
    const publisher = await this.repository.findById(publisherId);

    if (!publisher) throw new PublisherWasNotFound("Publisher was not found");

    if (publisher.isActive())
      throw new PublisherIsActive("Publisher is active, cannot be deleted");

    return await this.repository.delete(publisherId);
  }
}
