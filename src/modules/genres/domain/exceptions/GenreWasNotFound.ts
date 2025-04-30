export class GenreWasNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Genre was not found";
  }
}
