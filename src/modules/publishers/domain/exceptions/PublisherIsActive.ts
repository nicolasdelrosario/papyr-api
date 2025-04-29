export class PublisherIsActive extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Publisher is active";
  }
}
