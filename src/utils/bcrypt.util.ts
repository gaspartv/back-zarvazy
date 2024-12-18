import * as bcrypt from "bcrypt";
import { env } from "../config/env";

export class Bcrypt {
  static async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(env.SALT_OR_ROUNDS);
    return await bcrypt.hash(password, salt);
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
