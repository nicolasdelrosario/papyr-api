export class BookCreatedAt {
  public readonly value: Date;

  constructor(value: Date) {
    this.validate(value);
    this.value = value;
  }

  private validate(date: Date): void {
    if (Number.isNaN(date.getTime())) throw new Error("CreatedAt date must be a valid Date instance");

    const now = new Date();
    if (date > now) throw new Error("CreatedAt must be in the past");
  }
}
