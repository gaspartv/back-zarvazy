import { LanguageEnum } from "../common/enums/language.enum";
import { UTCEnum } from "../common/enums/utc.enum";
import dayjs from "../config/dayjs";
import { DateFormat } from "./date-format.util";

export class Dayjs {
  static now() {
    return dayjs().toDate();
  }

  static format(utc: UTCEnum, date?: Date): string {
    if (!date) date = dayjs().toDate();
    return dayjs(date).tz(utc).format();
  }

  static timestamp(date?: Date) {
    if (!date) date = dayjs().toDate();
    return dayjs(date).valueOf();
  }

  static toDate(
    timestamp: bigint,
    utc: UTCEnum,
    language: LanguageEnum,
    isBirthDate?: boolean,
  ) {
    const date = dayjs(Number(timestamp)).toDate();
    let dateFormat: string;
    if (isBirthDate) {
      return dayjs(date).tz(utc).format(DateFormat.formatDate(language));
    }
    dateFormat = DateFormat.formatFull(language);
    return dayjs(date).tz(utc).format(dateFormat);
  }
}
