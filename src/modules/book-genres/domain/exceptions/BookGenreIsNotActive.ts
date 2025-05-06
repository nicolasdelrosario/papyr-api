export class BookGenreIsNotActive extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Book genre is not active";
  }
}
