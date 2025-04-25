import { UserIsNotActive } from "@users/domain/exceptions/UserIsNotActive";
import { UserWasNotFound } from "@users/domain/exceptions/UserWasNotFound";
import type { User } from "@users/domain/model/User";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { UserEmail } from "@users/domain/value-objects/UserEmail";

export class FindUserByEmail {
  constructor(private readonly repository: UserRepository) {}

  async execute(email: string): Promise<User> {
    const user = await this.repository.findByEmail(new UserEmail(email));

    if (!user) throw new UserWasNotFound("User was not found.");

    if (!user.isActive()) throw new UserIsNotActive("User is not active.");

    return user;
  }
}
