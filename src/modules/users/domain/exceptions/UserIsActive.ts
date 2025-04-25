export class UserIsActive extends Error {
  constructor(message: string) {
    super(message);
    this.name = "User is Active";
  }
}
