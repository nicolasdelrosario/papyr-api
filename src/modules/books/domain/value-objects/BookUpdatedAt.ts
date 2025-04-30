export class BookUpdatedAt {
  public readonly value: Date;

  constructor(value: Date) {
    this.validate(value);
    this.value = value;
  }

  private validate(date: Date): void {
    if (Number.isNaN(date.getTime())) throw new Error("UpdatedAt date must be a valid Date instance");

    const now = new Date();
    if (date > now) throw new Error("UpdatedAt must be in the past");
  }
}
