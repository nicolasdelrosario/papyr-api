export interface PublisherDTO {
  id: string;
  name: string;
  country: string;
  website_url: string | null;
  founded_year: Date;
  description: string | null;
  logo_url: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
