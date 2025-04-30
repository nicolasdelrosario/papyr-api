export class BookPublicationDate {
  public readonly value: Date;

  constructor(value: Date) {
    this.validate(value);
    this.value = value;
  }

  private validate(date: Date): void {
    if (Number.isNaN(date.getTime())) throw new Error("Publication date must be a valid Date instance");

    const now = new Date();
    if (date > now) throw new Error("Publication date cannot be in the future");
  }
}
