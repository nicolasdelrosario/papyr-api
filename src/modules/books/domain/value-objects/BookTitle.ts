export class BookTitle {
  public readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  private validate(title: string): void {
    if (!title || typeof title !== "string") throw new Error("Title must be a valid string");

    if (title.trim().length < 3) throw new Error("Title must be at least 3 non-whitespace characters long");
  }
}
