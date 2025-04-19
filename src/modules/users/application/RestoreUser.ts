import type { UserRepository } from "@users/domain/repository/UserRepository";
import { UserId } from "@users/domain/value-objects/UserId";
import { UserNotFound } from "@users/domain/exceptions/UserNotFound";
import { UserActive } from "@users/domain/exceptions/UserActive";

export class RestoreUser {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.repository.findById(new UserId(id));

    if (!user) throw new UserNotFound(`User with id ${id} not found`);

    if (user.deletedAt.value === null)
      throw new UserActive(`User with id ${id} is already active`);

    user.restore();
    await this.repository.edit(user);
  }
}
