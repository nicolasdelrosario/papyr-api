export interface SaveUserDto {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  avatar_url: string | null;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
