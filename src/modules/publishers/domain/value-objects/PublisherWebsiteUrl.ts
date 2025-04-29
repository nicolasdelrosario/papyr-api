export class PublisherWebsiteUrl {
  public readonly value: string | null;

  constructor(value: string | null) {
    if (value === null || value === undefined || value === "") {
      this.value = null;
      return;
    }

    this.validate(value);
    this.value = value;
  }

  private validate(value: string): void {
    if (!value || typeof value !== "string") throw new Error("Publisher website URL must be a valid string");

    if (!value.startsWith("http")) throw new Error("Publisher website URL must start with http");
  }
}
