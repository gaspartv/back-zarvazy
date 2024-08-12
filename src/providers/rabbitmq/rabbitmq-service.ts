import { Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RestService } from "src/common/rest/rest-service";
import { env } from "src/config/env";
import { Security } from "src/utils/security";

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
