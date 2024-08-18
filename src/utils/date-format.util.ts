import { LanguageEnum } from "../common/enums/language.enum";

export class DateFormat {
  static formatFull(language: LanguageEnum): string {
    switch (language) {
      case LanguageEnum.ES_ES:
      case LanguageEnum.FR_FR:
      case LanguageEnum.DE_DE:
      case LanguageEnum.PT_BR:
        return "DD/MM/YYYY HH:mm:ss";
      case LanguageEnum.EN_US:
        return "MM/DD/YYYY HH:mm:ss AM/PM";
      case LanguageEnum.ZH_CN:
      case LanguageEnum.JA_JP:
      case LanguageEnum.KO_KR:
        return "YYYY-MM-DD HH:mm:ss";
    }
  }

  static formatDate(language: LanguageEnum) {
    switch (language) {
      case LanguageEnum.ES_ES:
      case LanguageEnum.FR_FR:
      case LanguageEnum.DE_DE:
      case LanguageEnum.PT_BR:
        return "DD/MM/YYYY";
      case LanguageEnum.EN_US:
        return "MM/DD/YYYY";
      case LanguageEnum.ZH_CN:
      case LanguageEnum.JA_JP:
      case LanguageEnum.KO_KR:
        return "YYYY-MM-DD";
    }
  }
}
