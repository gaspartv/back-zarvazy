import { UTCEnum } from "../common/enums/utc.enum";

export class UTC {
  static enum(utc: string) {
    switch (utc) {
      case "America/Sao_Paulo":
        return UTCEnum.AMERICA_SAO_PAULO;
      case "America/New_York":
        return UTCEnum.AMERICA_NOVA_YORK;
      case "America/Los_Angeles":
        return UTCEnum.AMERICA_LOS_ANGELES;
      case "America/Chicago":
        return UTCEnum.AMERICA_CHICAGO;
      case "Europe/Madrid":
        return UTCEnum.EUROPE_MADRI;
      case "Europe/Paris":
        return UTCEnum.EUROPE_PARIS;
      case "Europe/Berlin":
        return UTCEnum.EUROPE_BERLIM;
      case "Asia/Shanghai":
        return UTCEnum.ASIA_PEQUIM;
      case "Asia/Tokyo":
        return UTCEnum.ASIA_TÓQUIO;
      case "Asia/Seoul":
        return UTCEnum.ASIA_SEUL;
    }
  }
}
