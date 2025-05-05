export interface SaveBookDto {
  id: string;
  authorId: string;
  publisherId: string;
  title: string;
  description: string | null;
  isbn: string | null;
  publicationDate: Date;
  coverUrl: string | null;
  pages: number;
  language: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
