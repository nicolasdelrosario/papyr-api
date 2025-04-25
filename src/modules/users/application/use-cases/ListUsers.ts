import type { User } from "@users/domain/model/User";
import type { UserRepository } from "@users/domain/repository/UserRepository";

export class ListUsers {
  constructor(private readonly repository: UserRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.repository.list();

    return users;
  }
}
