import type { User } from "@users/domain/model/User";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { UserId } from "@users/domain/value-objects/UserId";

import { UserNotActive } from "@users/domain/exceptions/UserNotActive";
import { UserNotFound } from "@users/domain/exceptions/UserNotFound";

export class GetUserById {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.repository.findById(new UserId(id));

    if (!user) throw new UserNotFound("User not found.");

    if (user.deletedAt.value !== null) throw new UserNotActive("User is not active.");

    return user;
  }
}
