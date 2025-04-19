export class InvalidUsername extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Invalid Username";
  }
}
