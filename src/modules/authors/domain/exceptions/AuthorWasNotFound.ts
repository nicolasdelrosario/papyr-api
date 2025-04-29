export class AuthorWasNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Author was not found";
  }
}
