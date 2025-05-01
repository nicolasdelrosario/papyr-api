export interface SaveBookDto {
  id?: string;
  author_id: string;
  publisher_id: string;
  title: string;
  description: string | null;
  isbn: string | null;
  publication_date: Date;
  cover_url: string | null;
  pages: number;
  language: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
