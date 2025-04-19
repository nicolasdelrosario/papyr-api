export class UserDeletedAt {
  public readonly value: null | Date;

  constructor(value: null | Date) {
    this.validate(value);
    this.value = value;
  }

  private validate(date: null | Date): void {
    if (date && date > new Date()) throw new Error("DeletedAt must be in the past");
  }
}
