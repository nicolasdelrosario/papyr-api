export class PublisherWasNotFound extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Publisher was not found";
  }
}
