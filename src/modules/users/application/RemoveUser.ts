import { UserActive } from "@users/domain/exceptions/UserActive";
import { UserNotActive } from "@users/domain/exceptions/UserNotActive";
import { UserNotFound } from "@users/domain/exceptions/UserNotFound";
import type { UserRepository } from "@users/domain/repository/UserRepository";
import { UserId } from "@users/domain/value-objects/UserId";

export class RemoveUser {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.repository.findById(new UserId(id));

    if (!user) throw new UserNotFound(`User with id ${id} not found`);

    if (user.deletedAt.value !== null) throw new UserNotActive(`User with id ${id} is already deleted`);

    user.markAsDeleted();
    await this.repository.edit(user);
  }
}
