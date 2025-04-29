export class PublisherLogoUrl {
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
    if (!value || typeof value !== "string") throw new Error("Publisher logo URL must be a valid string");

    if (!value.startsWith("http")) throw new Error("Publisher logo URL must start with http");
  }
}
