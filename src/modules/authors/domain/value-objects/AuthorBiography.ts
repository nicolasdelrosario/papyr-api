export class AuthorBiography {
  public readonly value: string | null;

  constructor(value: string | null) {
    if (value === null || value === undefined || value === "") {
      this.value = null;
      return;
    }

    this.validate(value);
    this.value = value;
  }

  private validate(biography: string): void {
    if (biography.trim().length < 10) throw new Error("Biography must be at least 10 non-space characters long");
  }
}
