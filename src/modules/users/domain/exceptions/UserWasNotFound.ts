export class UserWasNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "User was not found";
  }
}
