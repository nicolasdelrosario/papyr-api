export class UserEmail {
  public readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  private validate(email: string): void {
    if (!email || typeof email !== "string")
      throw new Error("Email must be a valid string");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      throw new Error("Email must be a valid email address");
  }
}
