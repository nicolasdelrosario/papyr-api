import type { User } from "@users/domain/model/User";
import type { UserRepository } from "@users/domain/repository/UserRepository";

import { UserNotActive } from "@users/domain/exceptions/UserNotActive";
import { UserNotFound } from "@users/domain/exceptions/UserNotFound";
import { UserName } from "@users/domain/value-objects/UserName";

export class GetUserByUsername {
  constructor(private readonly repository: UserRepository) {}

  async execute(username: string): Promise<User> {
    const user = await this.repository.findByUsername(new UserName(username));

    if (!user) throw new UserNotFound("User not found.");

    if (user.deletedAt.value !== null) throw new UserNotActive("User is not active.");

    return user;
  }
}
