export class UserEmail {
  public readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  private validate(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) throw new Error("Email must be a valid email address");
  }
}
