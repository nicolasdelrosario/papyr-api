export class GenreDescription {
  public readonly value: string | null;

  constructor(value: string | null) {
    if (value === null || value === undefined || value === "") {
      this.value = null;
      return;
    }

    this.validate(value);
    this.value = value;
  }

  private validate(description: string): void {
    if (description.trim().length < 10) throw new Error("Description must be at least 10 non-space characters long");
  }
}
