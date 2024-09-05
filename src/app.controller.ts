import { Get, Render } from "@nestjs/common";
import { RestController } from "./common/rest/rest-controller";

@RestController("")
export class AppController {
  @Get("views")
  @Render("index.hbs")
  root() {
    return { message: "Hello world!" };
  }
}
