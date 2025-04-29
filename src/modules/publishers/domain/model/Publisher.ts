import type { PublisherCountry } from "@publishers/domain/value-objects/PublisherCountry";
import type { PublisherCreatedAt } from "@publishers/domain/value-objects/PublisherCreatedAt";
import { PublisherDeletedAt } from "@publishers/domain/value-objects/PublisherDeletedAt";
import type { PublisherDescription } from "@publishers/domain/value-objects/PublisherDescription";
import type { PublisherFoundedYear } from "@publishers/domain/value-objects/PublisherFoundedYear";
import type { PublisherId } from "@publishers/domain/value-objects/PublisherId";
import type { PublisherLogoUrl } from "@publishers/domain/value-objects/PublisherLogoUrl";
import type { PublisherName } from "@publishers/domain/value-objects/PublisherName";
import type { PublisherUpdatedAt } from "@publishers/domain/value-objects/PublisherUpdatedAt";
import type { PublisherWebsiteUrl } from "@publishers/domain/value-objects/PublisherWebsiteUrl";

export class Publisher {
  id: PublisherId;
  name: PublisherName;
  country: PublisherCountry;
  websiteUrl: PublisherWebsiteUrl;
  foundedYear: PublisherFoundedYear;
  description: PublisherDescription;
  logoUrl: PublisherLogoUrl;
  createdAt: PublisherCreatedAt;
  updatedAt: PublisherUpdatedAt;
  deletedAt: PublisherDeletedAt;

  constructor(
    id: PublisherId,
    name: PublisherName,
    country: PublisherCountry,
    websiteUrl: PublisherWebsiteUrl,
    foundedYear: PublisherFoundedYear,
    description: PublisherDescription,
    logoUrl: PublisherLogoUrl,
    createdAt: PublisherCreatedAt,
    updatedAt: PublisherUpdatedAt,
    deletedAt: PublisherDeletedAt,
  ) {
    this.id = id;
    this.name = name;
    this.country = country;
    this.websiteUrl = websiteUrl;
    this.foundedYear = foundedYear;
    this.description = description;
    this.logoUrl = logoUrl;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public toPrimitives() {
    return {
      id: this.id.value,
      name: this.name.value,
      country: this.country.value,
      websiteUrl: this.websiteUrl.value,
      foundedYear: this.foundedYear.value,
      description: this.description.value,
      logoUrl: this.logoUrl.value,
      createdAt: this.createdAt.value,
      updatedAt: this.updatedAt.value,
      deletedAt: this.deletedAt.value,
    };
  }

  isActive(): boolean {
    return this.deletedAt.value === null;
  }

  remove(): void {
    this.deletedAt = new PublisherDeletedAt(new Date());
  }

  restore(): void {
    this.deletedAt = new PublisherDeletedAt(null);
  }
}
