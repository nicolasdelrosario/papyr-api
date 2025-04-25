export class UserIsNotActive extends Error {
  constructor(message: string) {
    super(message);
    this.name = "User is not active";
  }
}
