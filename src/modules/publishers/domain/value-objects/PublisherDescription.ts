export class PublisherDescription {
  public readonly value: string | null;

  constructor(value: string | null) {
    if (value === null || value === undefined || value === "") {
      this.value = null;
      return;
    }

    this.validate(value);
    this.value = value;
  }

  private validate(description: string): void {
    if (!description || typeof description !== "string") throw new Error("Description must be a valid string");

    if (description.trim().length < 10) throw new Error("Description must be at least 10 non-space characters long");
  }
}
