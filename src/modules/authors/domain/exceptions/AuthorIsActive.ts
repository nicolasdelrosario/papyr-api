export class AuthorIsActive extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Author is active";
  }
}
