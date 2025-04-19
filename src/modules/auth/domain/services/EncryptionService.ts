import type { UserPassword } from "@users/domain/value-objects/UserPassword";

export interface EncryptionService {
  hash(password: UserPassword): Promise<UserPassword>;

  verify(password: UserPassword, hash: UserPassword): Promise<boolean>;
}
