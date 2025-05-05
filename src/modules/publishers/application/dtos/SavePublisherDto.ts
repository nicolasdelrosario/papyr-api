export interface SavePublisherDto {
  id: string;
  name: string;
  country: string;
  websiteUrl: string | null;
  foundedYear: Date;
  description: string | null;
  logoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
