export class UserUpdatedAt {
  public readonly value: Date;

  constructor(value: Date) {
    this.validate(value);
    this.value = value;
  }

  private validate(date: Date): void {
    if (date > new Date()) throw new Error("UpdatedAt must be in the past");
  }
}
