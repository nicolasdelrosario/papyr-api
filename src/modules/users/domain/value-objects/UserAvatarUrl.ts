export class UserAvatarUrl {
  public readonly value: string | null;

  constructor(value: string | null) {
    if (value === null || value === undefined || value === "") {
      this.value = null;
      return;
    }

    this.validate(value);
    this.value = value;
  }

  private validate(avatarUrl: string): void {
    if (!avatarUrl || typeof avatarUrl !== "string")
      throw new Error("Avatar URL must be a valid string");

    if (!avatarUrl.startsWith("http"))
      throw new Error("Avatar URL must start with http");
  }
}
