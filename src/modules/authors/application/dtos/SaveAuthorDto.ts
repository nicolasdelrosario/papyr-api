export interface SaveAuthorDto {
  id: string;
  name: string;
  biography: string | null;
  birthDate: Date;
  deathDate: Date | null;
  nationality: string | null;
  photoUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
