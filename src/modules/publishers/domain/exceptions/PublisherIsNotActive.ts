export class PublisherIsNotActive extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Publisher is not active";
  }
}
