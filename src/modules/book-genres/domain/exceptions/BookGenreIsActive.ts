export class BookGenreIsActive extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Book genre is active";
  }
}
