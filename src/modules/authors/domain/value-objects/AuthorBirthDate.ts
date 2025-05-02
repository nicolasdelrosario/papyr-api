export class AuthorBirthDate {
  public readonly value: Date;

  constructor(value: Date) {
    this.validate(value);
    this.value = value;
  }

  private validate(date: Date): void {
    if (!(date instanceof Date) || Number.isNaN(date.getTime()))
      throw new Error("Birth date must be a valid Date instance");

    const now = new Date();
    if (date > now) throw new Error("Birth date must be in the past");
  }
}
