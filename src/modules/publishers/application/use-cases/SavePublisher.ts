import type { SavePublisherDto } from "@publishers/application/dtos/SavePublisherDto";
import { PublisherIsNotActive } from "@publishers/domain/exceptions/PublisherIsNotActive";
import { PublisherWasNotFound } from "@publishers/domain/exceptions/PublisherWasNotFound"; // Faltaba esta excepción
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
    const now = new Date();
    const isUpdate = publisher.id !== undefined && publisher.id !== null;

    if (isUpdate) {
      const publisherId = new PublisherId(publisher.id);
      const existingPublisher = await this.repository.findById(publisherId);

      if (!existingPublisher) throw new PublisherWasNotFound("Publisher was not found");

      if (!existingPublisher.isActive()) throw new PublisherIsNotActive("Publisher is not active");

      const updatedPublisher = new Publisher(
        publisherId,
        new PublisherName(publisher.name ?? existingPublisher.name.value),
        new PublisherCountry(publisher.country ?? existingPublisher.country.value),
        new PublisherWebsiteUrl(publisher.websiteUrl ?? existingPublisher.websiteUrl.value),
        new PublisherFoundedYear(
          publisher.foundedYear ? new Date(publisher.foundedYear) : existingPublisher.foundedYear.value,
        ),
        new PublisherDescription(publisher.description ?? existingPublisher.description.value),
        new PublisherLogoUrl(publisher.logoUrl ?? existingPublisher.logoUrl.value),
        new PublisherCreatedAt(existingPublisher.createdAt.value),
        new PublisherUpdatedAt(now),
        new PublisherDeletedAt(existingPublisher.deletedAt.value),
      );

      return await this.repository.save(updatedPublisher);
    }

    const publisherId = new PublisherId(crypto.randomUUID());

    const newPublisher = new Publisher(
      publisherId,
      new PublisherName(publisher.name),
      new PublisherCountry(publisher.country),
      new PublisherWebsiteUrl(publisher.websiteUrl ?? null),
      new PublisherFoundedYear(new Date(publisher.foundedYear)),
      new PublisherDescription(publisher.description ?? null),
      new PublisherLogoUrl(publisher.logoUrl ?? null),
      new PublisherCreatedAt(now),
      new PublisherUpdatedAt(now),
      new PublisherDeletedAt(null),
    );

    return await this.repository.save(newPublisher);
  }
}
