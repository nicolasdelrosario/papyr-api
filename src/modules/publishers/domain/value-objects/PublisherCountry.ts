export class PublisherCountry {
  public readonly value: string;

  constructor(value: string) {
    this.validate(value);
    this.value = value;
  }

  private validate(country: string): void {
    if (!country || typeof country !== "string") throw new Error("Country must be a valid string");

    if (country.trim().length < 2) throw new Error("Country name must be at least 2 non-space characters long");
  }
}
