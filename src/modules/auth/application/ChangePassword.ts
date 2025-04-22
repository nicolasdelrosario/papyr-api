import { UserUpdatedAt } from "@/modules/users/domain/value-objects/UserUpdatedAt";
import type { EncryptionService } from "@auth/domain/services/EncryptionService";
import { InvalidCredentials } from "@core/domain/exceptions/InvalidCredentials";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { UserEmail } from "@users/domain/value-objects/UserEmail";
import { UserPassword } from "@users/domain/value-objects/UserPassword";

export class ChangePassword {
  constructor(
    private readonly repository: UserRepository,
    private readonly service: EncryptionService,
  ) {}

  async execute(email: string, password: string, newPassword: string) {
    const user = await this.repository.findByEmail(new UserEmail(email));

    if (!user || user.deletedAt.value !== null) throw new InvalidCredentials("Invalid Credentials");

    const isPasswordValid = await this.service.verify(new UserPassword(password), user.password);

    if (!isPasswordValid) throw new InvalidCredentials("Invalid Credentials");

    const hashedPassword = await this.service.hash(new UserPassword(newPassword));

    await this.repository.changePassword(user.id, new UserPassword(hashedPassword), new UserUpdatedAt(new Date()));
  }
}
