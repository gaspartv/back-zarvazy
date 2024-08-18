import { LanguageEnum } from "../common/enums/language.enum";
import { CNPJException } from "../common/exceptions/cnpj.exception";
import { CPFException } from "../common/exceptions/cpf.exception";

export class Validation {
  static CNPJ(cnpj: string, language: LanguageEnum): void {
    const regex = /^\d{14}$/;
    if (regex.test(cnpj)) return;
    CNPJException(language);
  }

  static CPF(cpf: string, language: LanguageEnum): void {
    cpf = cpf.replace(/\D/g, "");
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
      CPFException(language);
    }

    let rest = 0;
    let sum = 0;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) {
      CPFException(language);
    }

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) {
      CPFException(language);
    }
    return;
  }
}
