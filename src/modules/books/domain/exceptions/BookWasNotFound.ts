export class BookWasNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Book was not found";
  }
}
