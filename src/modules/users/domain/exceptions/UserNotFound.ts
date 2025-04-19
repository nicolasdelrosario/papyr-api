export class UserNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "User Not Found";
  }
}
