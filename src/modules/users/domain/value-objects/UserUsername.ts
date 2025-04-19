export class UserUsername {
  constructor(public readonly value: string) {
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(value)) {
      throw new Error("Invalid username.");
    }
  }
}
