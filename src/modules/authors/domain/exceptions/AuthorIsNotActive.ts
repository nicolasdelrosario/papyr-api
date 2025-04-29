export class AuthorIsNotActive extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Author is not active";
  }
}
