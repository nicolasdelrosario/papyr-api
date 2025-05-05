import type { ChangePasswordDTO } from "@auth/application/dtos/ChangePasswordDto";
import type { EncryptionService } from "@auth/domain/services/EncryptionService";
import { InvalidCredentials } from "@core/domain/exceptions/InvalidCredentials";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { UserEmail } from "@users/domain/value-objects/UserEmail";
import { UserPassword } from "@users/domain/value-objects/UserPassword";
import { UserUpdatedAt } from "@users/domain/value-objects/UserUpdatedAt";

export class ChangePassword {
  constructor(
    private readonly repository: UserRepository,
    private readonly service: EncryptionService,
  ) {}

  async execute(credentials: ChangePasswordDTO) {
    const { email, password, newPassword } = credentials;

    const userEmail = new UserEmail(email);
    const user = await this.repository.findByEmail(userEmail);
    const now = new Date();

    if (!user || !user.isActive()) throw new InvalidCredentials("Invalid Credentials");

    const passwordMatches = await this.service.verify(new UserPassword(password), user.password);

    if (!passwordMatches) throw new InvalidCredentials("Invalid Credentials");

    const hashedPassword = await this.service.hash(new UserPassword(newPassword));

    await this.repository.changePassword(user.id, new UserPassword(hashedPassword), new UserUpdatedAt(now));
  }
}
