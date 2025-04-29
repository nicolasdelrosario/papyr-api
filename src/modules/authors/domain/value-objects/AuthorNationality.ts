export class AuthorNationality {
  public readonly value: string | null;

  constructor(value: string | null) {
    if (value === null || value === undefined || value === "") {
      this.value = null;
      return;
    }

    this.validate(value);
    this.value = value;
  }

  private validate(nationality: string): void {
    if (!nationality || typeof nationality !== "string") throw new Error("Nationality must be a valid string");

    if (nationality.trim().length < 3) throw new Error("Nationality must be at least 3 non-space characters long");
  }
}
