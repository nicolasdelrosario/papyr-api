export class UserCreatedAt {
  public readonly value: Date;

  constructor(value: Date) {
    this.validate(value);
    this.value = value;
  }

  private validate(date: Date): void {
    if (date > new Date()) throw new Error("CreatedAt must be in the past");
  }
}
