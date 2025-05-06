export class BookGenreWasNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Book genre was not found";
  }
}
