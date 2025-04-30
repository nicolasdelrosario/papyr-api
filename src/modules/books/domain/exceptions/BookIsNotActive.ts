export class BookIsNotActive extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Book is not active";
  }
}
