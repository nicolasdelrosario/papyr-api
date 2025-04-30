export class BookCoverUrl {
  public readonly value: string | null;

  constructor(value: string | null) {
    if (value === null || value === undefined || value === "") {
      this.value = null;
      return;
    }

    this.validate(value);
    this.value = value;
  }

  private validate(coverUrl: string): void {
    if (!coverUrl || typeof coverUrl !== "string") throw new Error("Cover URL must be a valid string");

    if (!coverUrl.startsWith("http")) throw new Error("Cover URL must start with http");
  }
}
