export class UserName {
  public readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  private validate(name: string): void {
    if (name.length < 3)
      throw new Error("Name must be at least 3 characters long");
  }
}
