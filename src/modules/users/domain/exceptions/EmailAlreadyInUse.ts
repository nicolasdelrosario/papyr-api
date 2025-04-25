export class EmailAlreadyInUse extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Email already in use";
  }
}
