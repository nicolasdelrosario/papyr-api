export interface AuthorDTO {
  id: string;
  name: string;
  biography: string | null;
  birth_date: Date;
  death_date: Date | null;
  nationality: string | null;
  photo_url: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
