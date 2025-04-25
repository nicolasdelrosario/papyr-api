import { UserIsNotActive } from "@users/domain/exceptions/UserIsNotActive";
import { UserWasNotFound } from "@users/domain/exceptions/UserWasNotFound";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { UserId } from "@users/domain/value-objects/UserId";

export class SoftDeleteUser {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const userId = new UserId(id);
    const user = await this.repository.findById(userId);

    if (!user) throw new UserWasNotFound("User was not found");

    if (!user.isActive()) throw new UserIsNotActive("User is not active");

    user.remove();

    await this.repository.save(user);
  }
}
