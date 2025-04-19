export class UserNotActive extends Error {
  constructor(message: string) {
    super(message);
    this.name = "User Not Active";
  }
}
