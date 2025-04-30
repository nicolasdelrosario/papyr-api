export class GenreIsNotActive extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Genre is not active already";
  }
}
