import type { User } from "@users/domain/model/User";
import type { UserRepository } from "@users/domain/repository/UserRepository";

export class GetUsers {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.userRepository.getAll();

    return users;
  }
}
