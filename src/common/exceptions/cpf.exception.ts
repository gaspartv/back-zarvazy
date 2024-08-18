import { UnprocessableEntityException } from "@nestjs/common";
import { LanguageEnum } from "../enums/language.enum";

// * Translations here * //
export function CPFException(language: LanguageEnum) {
  let message: string;
  switch (language) {
    case LanguageEnum.PT_BR:
      message = "CPF inválido";
    case LanguageEnum.EN_US:
      message = "Invalid CPF";
    case LanguageEnum.ES_ES:
      message = "CPF inválido";
    case LanguageEnum.FR_FR:
      message = "CPF invalide";
    case LanguageEnum.DE_DE:
      message = "Ungültige CPF";
    case LanguageEnum.ZH_CN:
      message = "无效的CPF";
    case LanguageEnum.JA_JP:
      message = "無効なCPF";
    case LanguageEnum.KO_KR:
      message = "잘못된 CPF";
  }
  throw new UnprocessableEntityException(message);
}
