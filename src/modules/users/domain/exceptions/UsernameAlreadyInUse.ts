export class UsernameAlreadyInUse extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Username already in use";
  }
}
