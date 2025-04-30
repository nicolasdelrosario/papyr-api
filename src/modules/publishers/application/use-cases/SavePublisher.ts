import type { SavePublisherDto } from "@publishers/application/dtos/SavePublisherDto";
import { PublisherIsNotActive } from "@publishers/domain/exceptions/PublisherIsNotActive";
import { Publisher } from "@publishers/domain/model/Publisher";
import type { PublisherRepository } from "@publishers/domain/repository/PublisherRepository";
import { PublisherCountry } from "@publishers/domain/value-objects/PublisherCountry";
import { PublisherCreatedAt } from "@publishers/domain/value-objects/PublisherCreatedAt";
import { PublisherDeletedAt } from "@publishers/domain/value-objects/PublisherDeletedAt";
import { PublisherDescription } from "@publishers/domain/value-objects/PublisherDescription";
import { PublisherFoundedYear } from "@publishers/domain/value-objects/PublisherFoundedYear";
import { PublisherId } from "@publishers/domain/value-objects/PublisherId";
import { PublisherLogoUrl } from "@publishers/domain/value-objects/PublisherLogoUrl";
import { PublisherName } from "@publishers/domain/value-objects/PublisherName";
import { PublisherUpdatedAt } from "@publishers/domain/value-objects/PublisherUpdatedAt";
import { PublisherWebsiteUrl } from "@publishers/domain/value-objects/PublisherWebsiteUrl";

export class SavePublisher {
  constructor(private readonly repository: PublisherRepository) {}

  async execute(publisher: SavePublisherDto): Promise<void> {
    const publisherId = publisher.id ? new PublisherId(publisher.id) : new PublisherId(crypto.randomUUID());
    const now = new Date();

    const existingPublisher = await this.repository.findById(publisherId);

    if (!existingPublisher) {
      const newPublisher = new Publisher(
        publisherId,
        new PublisherName(publisher.name),
        new PublisherCountry(publisher.country),
        new PublisherWebsiteUrl(publisher.website_url ?? null),
        new PublisherFoundedYear(publisher.founded_year),
        new PublisherDescription(publisher.description ?? null),
        new PublisherLogoUrl(publisher.logo_url ?? null),
        new PublisherCreatedAt(now),
        new PublisherUpdatedAt(now),
        new PublisherDeletedAt(null),
      );

      return await this.repository.save(newPublisher);
    }

    if (!existingPublisher.isActive()) throw new PublisherIsNotActive("Publisher is not active");

    const updatedPublisher = new Publisher(
      publisherId,
      new PublisherName(publisher.name ?? existingPublisher.name.value),
      new PublisherCountry(publisher.country ?? existingPublisher.country.value),
      new PublisherWebsiteUrl(publisher.website_url ?? existingPublisher.websiteUrl.value),
      new PublisherFoundedYear(publisher.founded_year ?? existingPublisher.foundedYear.value),
      new PublisherDescription(publisher.description ?? existingPublisher.description.value),
      new PublisherLogoUrl(publisher.logo_url ?? existingPublisher.logoUrl.value),
      new PublisherCreatedAt(existingPublisher.createdAt.value),
      new PublisherUpdatedAt(now),
      new PublisherDeletedAt(existingPublisher.deletedAt.value),
    );

    return await this.repository.save(updatedPublisher);
  }
}
