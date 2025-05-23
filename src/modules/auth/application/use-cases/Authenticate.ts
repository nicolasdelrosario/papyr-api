import type { EncryptionService } from "@auth/domain/services/EncryptionService";
import { InvalidCredentials } from "@core/domain/exceptions/InvalidCredentials";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { UserEmail } from "@users/domain/value-objects/UserEmail";
import { UserPassword } from "@users/domain/value-objects/UserPassword";
import { sign } from "hono/jwt";

export class Authenticate {
  constructor(
    private readonly repository: UserRepository,
    private readonly service: EncryptionService,
    private readonly jwtSecret: string,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.repository.findByEmail(new UserEmail(email));

    if (!user) throw new InvalidCredentials("Invalid credentials");

    if (!user.isActive()) throw new InvalidCredentials("Invalid credentials");

    const isPasswordValid = await this.service.verify(new UserPassword(password), user.password);

    if (!isPasswordValid) throw new InvalidCredentials("Invalid credentials");

    const payload = {
      id: user.id.value,
      email: user.email.value,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 7,
    };

    const token = await sign(payload, this.jwtSecret);

    return {
      id: user.id.value,
      email: user.email.value,
      name: user.name.value,
      token,
    };
  }
}
