export class BookIsbn {
  public readonly value: string | null;

  constructor(value: string | null) {
    if (value === null || value === undefined || value === "") {
      this.value = null;
      return;
    }

    this.validate(value);
    this.value = value;
  }

  private validate(isbn: string): void {
    const cleaned = isbn.replace(/[-\s]/g, "");
    if (!/^(\d{10}|\d{13})$/.test(cleaned)) throw new Error("ISBN must be a 10 or 13 digit number (hyphens optional)");

    if (cleaned.length === 10 && !this.isValidIsbn10(cleaned)) throw new Error("Invalid ISBN-10 checksum");

    if (cleaned.length === 13 && !this.isValidIsbn13(cleaned)) throw new Error("Invalid ISBN-13 checksum");
  }

  private isValidIsbn10(isbn: string): boolean {
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      const digit = Number.parseInt(isbn.charAt(i));
      if (Number.isNaN(digit)) return false;
      sum += (10 - i) * digit;
    }

    const last = isbn.charAt(9);
    sum += last === "X" ? 10 : Number.parseInt(last);
    return sum % 11 === 0;
  }

  private isValidIsbn13(isbn: string): boolean {
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      const digit = Number.parseInt(isbn.charAt(i));
      if (Number.isNaN(digit)) return false;
      sum += i % 2 === 0 ? digit : digit * 3;
    }

    const checkDigit = Number.parseInt(isbn.charAt(12));
    return (10 - (sum % 10)) % 10 === checkDigit;
  }
}
