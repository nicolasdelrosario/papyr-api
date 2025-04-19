import type { User } from "@users/domain/model/User";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { UserEmail } from "@users/domain/value-objects/UserEmail";

import { UserNotActive } from "@users/domain/exceptions/UserNotActive";
import { UserNotFound } from "@users/domain/exceptions/UserNotFound";

export class GetUserByEmail {
  constructor(private readonly repository: UserRepository) {}

  async execute(email: string): Promise<User> {
    const user = await this.repository.findByEmail(new UserEmail(email));

    if (!user) throw new UserNotFound("User not found.");

    if (user.deletedAt.value !== null) throw new UserNotActive("User is not active.");

    return user;
  }
}
