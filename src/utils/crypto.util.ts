import crypto from "crypto";

export class Crypto {
  static hash(text: string): string {
    return crypto.createHash("sha256").update(text).digest("hex");
  }
}
