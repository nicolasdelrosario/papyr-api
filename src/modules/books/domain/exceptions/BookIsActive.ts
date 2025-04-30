export class BookIsActive extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Book is active";
  }
}
