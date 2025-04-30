export class BookPages {
  public readonly value: number;

  constructor(value: number) {
    this.validate(value);
    this.value = value;
  }

  private validate(pages: number): void {
    if (!pages || typeof pages !== "number") throw new Error("Pages must be a valid number");

    if (pages < 1) throw new Error("Pages must be at least 1");
  }
}
