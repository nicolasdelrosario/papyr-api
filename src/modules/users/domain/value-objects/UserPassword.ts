export class UserPassword {
  public readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  private validate(password: string): void {
    if (!password || typeof password !== "string")
      throw new Error("Password must be a valid string");

    if (password.trim().length < 8)
      throw new Error("Password must be at least 8 characters long");
  }
}
