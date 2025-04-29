export class PublisherName {
  public readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  private validate(name: string): void {
    if (!name || typeof name !== "string") throw new Error("Name must be a valid string");

    if (name.trim().length < 3) throw new Error("Name must be at least 3 non-space characters long");
  }
}
