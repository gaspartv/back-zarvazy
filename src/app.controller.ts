import { Get } from "@nestjs/common";
import { LanguageEnum } from "./common/enums/language.enum";
import { UTCEnum } from "./common/enums/utc.enum";
import { RestController } from "./common/rest/rest-controller";
import { Dayjs } from "./utils/dayjs.util";

@RestController("seed")
export class AppController {
  @Get()
  seed() {
    const x = Dayjs.format(
      UTCEnum.AMERICA_SAO_PAULO,
      LanguageEnum.PT_BR,
      new Date("2021-01-01T00:00:00Z"),
    );

    console.log(x);

    return;
  }
}
