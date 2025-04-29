export class AuthorDeathDate {
  public readonly value: Date | null;

  constructor(value: Date | null) {
    if (value === null || value === undefined) {
      this.value = null;
      return;
    }

    this.validate(value);
    this.value = value;
  }

  private validate(date: Date): void {
    if (Number.isNaN(date.getTime())) throw new Error("Death date must be a valid Date instance");

    const now = new Date();
    if (date > now) throw new Error("Death date must be in the past");
  }
}
