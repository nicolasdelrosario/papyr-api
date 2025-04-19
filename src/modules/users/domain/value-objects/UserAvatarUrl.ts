export class UserAvatarUrl {
  public readonly value: string | null;

  constructor(value: string | null) {
    this.validate(value);
    this.value = value;
  }

  private validate(value: string | null): void {
    if (value && !value.startsWith("http")) throw new Error("Avatar URL must start with http");
  }
}
