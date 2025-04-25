import { UserIsActive } from "@users/domain/exceptions/UserIsActive";
import { UserWasNotFound } from "@users/domain/exceptions/UserWasNotFound";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { UserId } from "@users/domain/value-objects/UserId";

export class DeleteUser {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string) {
    const userId = new UserId(id);
    const user = await this.repository.findById(userId);

    if (!user) throw new UserWasNotFound("User was not found");

    if (user.isActive()) throw new UserIsActive("User is active, cannot be deleted");

    await this.repository.delete(userId);
  }
}
