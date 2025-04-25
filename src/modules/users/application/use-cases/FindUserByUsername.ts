import { UserIsNotActive } from "@users/domain/exceptions/UserIsNotActive";
import { UserWasNotFound } from "@users/domain/exceptions/UserWasNotFound";
import type { User } from "@users/domain/model/User";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { UserUsername } from "@users/domain/value-objects/UserUsername";

export class FindUserByUsername {
  constructor(private readonly repository: UserRepository) {}

  async execute(username: string): Promise<User> {
    const user = await this.repository.findByUsername(new UserUsername(username));

    if (!user) throw new UserWasNotFound("User was not found.");

    if (!user.isActive()) throw new UserIsNotActive("User is not active.");

    return user;
  }
}
