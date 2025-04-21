export class InvalidData extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Invalid Data";
  }
}
