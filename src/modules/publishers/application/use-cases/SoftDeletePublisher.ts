import { PublisherIsNotActive } from "@publishers/domain/exceptions/PublisherIsNotActive";
import { PublisherWasNotFound } from "@publishers/domain/exceptions/PublisherWasNotFound";
import type { PublisherRepository } from "@publishers/domain/repository/PublisherRepository";
import { PublisherId } from "@publishers/domain/value-objects/PublisherId";

export class SoftDeletePublisher {
  constructor(private readonly repository: PublisherRepository) {}

  async execute(id: string): Promise<void> {
    const publisherId = new PublisherId(id);
    const publisher = await this.repository.findById(publisherId);

    if (!publisher) throw new PublisherWasNotFound("Publisher was not found");

    if (!publisher.isActive()) throw new PublisherIsNotActive("Publisher is not active already");

    publisher.remove();

    await this.repository.save(publisher);
  }
}
