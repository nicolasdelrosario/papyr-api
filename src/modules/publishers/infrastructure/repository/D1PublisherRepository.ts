import type { PublisherDTO } from "@publishers/application/dtos/PublisherDto";
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
import { zodPublisherSchema } from "@publishers/infrastructure/schemas/zodPublisherSchema";

export class D1PublisherRepository implements PublisherRepository {
  constructor(private readonly db: D1Database) {}

  async list(): Promise<Publisher[]> {
    const { results } = await this.db.prepare("SELECT * FROM publishers WHERE deleted_at IS NULL").all<PublisherDTO>();

    return results.map((row) => this.mapToDomain(row));
  }

  async findById(id: PublisherId): Promise<Publisher | null> {
    const row = await this.db.prepare("SELECT * FROM publishers WHERE id = ?").bind(id.value).first<PublisherDTO>();

    return row ? this.mapToDomain(row) : null;
  }

  async save(publisher: Publisher): Promise<void> {
    await this.db
      .prepare(
        `
        INSERT INTO publishers (
          id,
          name,
          country,
          website_url,
          founded_year,
          description,
          logo_url,
          created_at,
          updated_at,
          deleted_at
        ) VALUES (
          ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
        ON CONFLICT(id) DO UPDATE SET
          name         = excluded.name,
          country      = excluded.country,
          website_url  = excluded.website_url,
          founded_year = excluded.founded_year,
          description  = excluded.description,
          logo_url     = excluded.logo_url,
          updated_at   = excluded.updated_at,
          deleted_at   = excluded.deleted_at
        `,
      )
      .bind(
        publisher.id.value,
        publisher.name.value,
        publisher.country.value,
        publisher.websiteUrl.value,
        publisher.foundedYear.value.toISOString(),
        publisher.description.value,
        publisher.logoUrl.value,
        publisher.createdAt.value.toISOString(),
        publisher.updatedAt.value.toISOString(),
        publisher.deletedAt.value ? publisher.deletedAt.value.toISOString() : null,
      )
      .run();
  }

  async delete(id: PublisherId): Promise<void> {
    await this.db.prepare("DELETE FROM publishers WHERE id = ?").bind(id.value).run();
  }

  private mapToDomain(row: PublisherDTO): Publisher {
    const camelCaseRow = {
      id: row.id,
      name: row.name,
      country: row.country,
      websiteUrl: row.website_url,
      foundedYear: row.founded_year,
      description: row.description,
      logoUrl: row.logo_url,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      deletedAt: row.deleted_at,
    };

    const parsed = zodPublisherSchema.parse(camelCaseRow);

    return new Publisher(
      new PublisherId(parsed.id),
      new PublisherName(parsed.name),
      new PublisherCountry(parsed.country),
      new PublisherWebsiteUrl(parsed.websiteUrl),
      new PublisherFoundedYear(new Date(parsed.foundedYear)),
      new PublisherDescription(parsed.description),
      new PublisherLogoUrl(parsed.logoUrl),
      new PublisherCreatedAt(new Date(parsed.createdAt)),
      new PublisherUpdatedAt(new Date(parsed.updatedAt)),
      new PublisherDeletedAt(parsed.deletedAt ? new Date(parsed.deletedAt) : null),
    );
  }
}
