export class BookLanguage {
  public readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  private validate(language: string): void {
    if (!language || typeof language !== "string") throw new Error("Language must be a valid string");

    if (language.trim().length <= 2) throw new Error("Language name must be at least 2 non-whitespace characters long");
  }
}
