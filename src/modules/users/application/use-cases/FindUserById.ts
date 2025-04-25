import { UserIsNotActive } from "@users/domain/exceptions/UserIsNotActive";
import { UserWasNotFound } from "@users/domain/exceptions/UserWasNotFound";
import type { User } from "@users/domain/model/User";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { UserId } from "@users/domain/value-objects/UserId";

export class FindUserById {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.repository.findById(new UserId(id));

    if (!user) throw new UserWasNotFound("User was not found.");

    if (!user.isActive()) throw new UserIsNotActive("User is not active.");

    return user;
  }
}
