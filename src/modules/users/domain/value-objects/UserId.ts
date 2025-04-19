export class UserId {
  public readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  private validate(uuid: string): void {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(uuid)) throw new Error("Invalid UUID format");
  }
}
