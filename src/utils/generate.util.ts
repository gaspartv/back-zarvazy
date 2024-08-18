export class Generate {
  static code(): string {
    const alphaNumeric = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    return Array.from({ length: 9 }, () =>
      alphaNumeric.charAt(Math.floor(Math.random() * alphaNumeric.length)),
    ).join("");
  }
}
