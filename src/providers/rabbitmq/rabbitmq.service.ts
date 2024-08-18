import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RestService } from "../../common/rest/rest-service";
import { env } from "../../config/env";
import { Security } from "../../utils/security.util";

@RestService()
export class RabbitmqService {
  constructor(
    @Inject(env.RABBITMQ_NAME) private readonly rabbitmq: ClientProxy,
  ) {}

  async message(key: string) {
    const payload = JSON.parse(Security.decrypt(key));
    console.log(payload);
  }

  async status(key: string) {
    const payload = Security.decrypt(key);
    console.log(payload);
  }
}
