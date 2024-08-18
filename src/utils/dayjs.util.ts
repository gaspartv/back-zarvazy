import { LanguageEnum } from "../common/enums/language.enum";
import { UTCEnum } from "../common/enums/utc.enum";
import dayjs from "../config/dayjs";
import { DateFormat } from "./date-format.util";

export class Dayjs {
  static format(utc: UTCEnum, language: LanguageEnum, date?: Date): string {
    if (!date) date = new Date();
    const dateFormat = DateFormat.formatFull(language);
    return dayjs(date).tz(utc).format(dateFormat);
  }

  static timestamp(date?: Date) {
    if (!date) date = new Date();
    return dayjs(date).valueOf();
  }
}
