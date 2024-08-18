import {
  getCode,
  getCodeList,
  getCodes,
  getData,
  getName,
  getNameList,
  getNames,
} from "country-list";

export class Country {
  static getName(code: string) {
    return getName(code);
  }

  static getNames() {
    return getNames();
  }

  static getNameList() {
    return getNameList();
  }

  static getCode(name: string) {
    return getCode(name);
  }

  static getCodes() {
    return getCodes();
  }

  static getCodeList() {
    return getCodeList();
  }

  static getData() {
    return getData();
  }
}
