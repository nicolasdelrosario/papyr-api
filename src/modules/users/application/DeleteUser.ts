import { UserActive } from "@users/domain/exceptions/UserActive";
import { UserNotFound } from "@users/domain/exceptions/UserNotFound";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { UserId } from "@users/domain/value-objects/UserId";

export class DeleteUser {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string) {
    const user = await this.repository.findById(new UserId(id));

    if (!user) throw new UserNotFound("User not found");

    if (user.deletedAt.value === null) {
      throw new UserActive("User is active, please deactivate it first");
    }

    await this.repository.remove(new UserId(id));
  }
}
