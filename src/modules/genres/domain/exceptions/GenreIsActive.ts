export class GenreIsActive extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Genre is already active";
  }
}
