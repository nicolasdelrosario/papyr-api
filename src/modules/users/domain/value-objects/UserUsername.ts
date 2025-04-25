export class UserUsername {
  constructor(public readonly value: string) {
    this.validate(value);
    this.value = value;
  }

  private validate(username: string): void {
    if (!username || typeof username !== "string")
      throw new Error("Username must be a string.");

    if (username.trim().length < 3 || username.trim().length > 20)
      throw new Error("Username must be between 3 and 20 characters.");

    if (!/^[a-zA-Z0-9_]{3,20}$/.test(username))
      throw new Error("Invalid username.");
  }
}
