import type { UserPassword } from "@users/domain/value-objects/UserPassword";

export interface EncryptionService {
  hash(password: UserPassword): Promise<string>;

  verify(password: UserPassword, hash: UserPassword): Promise<boolean>;
}
