import { ConflictException } from "@nestjs/common";
import { LanguageEnum } from "../enums/language.enum";

// * Translations here * //
export function PasswordRequirementException(language: LanguageEnum): void {
  let message: string;
  switch (language) {
    case LanguageEnum.PT_BR:
      message = "A senha não atende aos requisitos";
      break;
    case LanguageEnum.EN_US:
      message = "Password does not meet the requirements";
      break;
    case LanguageEnum.ES_ES:
      message = "La contraseña no cumple con los requisitos";
      break;
    case LanguageEnum.FR_FR:
      message = "Le mot de passe ne répond pas aux exigences";
      break;
    case LanguageEnum.DE_DE:
      message = "Das Passwort entspricht nicht den Anforderungen";
      break;
    case LanguageEnum.ZH_CN:
      message = "密码不符合要求";
      break;
    case LanguageEnum.JA_JP:
      message = "パスワードが要件を満たしていません";
      break;
    case LanguageEnum.KO_KR:
      message = "비밀번호가 요구 사항을 충족하지 않습니다";
      break;
  }
  console.log("message", message);
  throw new ConflictException(message);
}
//
