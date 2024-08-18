import { UnprocessableEntityException } from "@nestjs/common";
import { LanguageEnum } from "../enums/language.enum";

// * Translations here * //
export function CNPJException(language: LanguageEnum) {
  let message: string;
  switch (language) {
    case LanguageEnum.PT_BR:
      message = "CNPJ inválido";
    case LanguageEnum.EN_US:
      message = "Invalid CNPJ";
    case LanguageEnum.ES_ES:
      message = "CNPJ inválido";
    case LanguageEnum.FR_FR:
      message = "CNPJ invalide";
    case LanguageEnum.DE_DE:
      message = "Ungültige CNPJ";
    case LanguageEnum.ZH_CN:
      message = "无效的CNPJ";
    case LanguageEnum.JA_JP:
      message = "無効なCNPJ";
    case LanguageEnum.KO_KR:
      message = "잘못된 CNPJ";
  }
  throw new UnprocessableEntityException(message);
}
