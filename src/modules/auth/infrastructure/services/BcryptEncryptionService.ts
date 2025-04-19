import type { UserPassword } from "@/modules/users/domain/value-objects/UserPassword";
import type { EncryptionService } from "@auth/domain/services/EncryptionService";
import bcrypt from "bcryptjs";

export class BcryptEncryptionService implements EncryptionService {
  async hash(password: UserPassword): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password.value, saltRounds);
  }

  async verify(password: UserPassword, hash: UserPassword): Promise<boolean> {
    return await bcrypt.compare(password.value, hash.value);
  }
}
