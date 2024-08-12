import { ValidationPipe } from "@nestjs/common";
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from "@nestjs/microservices";
import { Provider } from "src/common/enums/provider";
import { RestConsumer } from "src/common/rest/rest-consumer";
import { Log } from "src/config/log";
import { RabbitmqService } from "./rabbitmq-service";

class PayloadReceived {
  key: string;
}

@RestConsumer("queue")
export class RabbitMQConsumer {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  private readonly validationPipe = new ValidationPipe({
    errorHttpStatusCode: 422,
    whitelist: true,
    transform: true,
    transformOptions: { groups: ["transform"] },
  });

  private ack(context: RmqContext) {
    context.getChannelRef().ack(context.getMessage());
  }

  @MessagePattern(Provider.MESSAGE)
  async message(
    @Ctx() context: RmqContext,
    @Payload() payload: PayloadReceived,
  ): Promise<void> {
    try {
      await this.validationPipe.transform(payload, {
        type: "body",
        metatype: PayloadReceived,
      });
    } catch (e) {
      Log.error(e, "RabbitMQConsumer.message");
      this.ack(context);
      return;
    }
    this.rabbitmqService.message(payload.key);
    this.ack(context);
    return;
  }

  @MessagePattern(Provider.STATUS)
  async status(
    @Ctx() context: RmqContext,
    @Payload() payload: PayloadReceived,
  ) {
    try {
      await this.validationPipe.transform(payload, {
        type: "body",
        metatype: PayloadReceived,
      });
    } catch (e) {
      Log.error(e, "RabbitMQConsumer.status");
      return this.ack(context);
    }
    this.rabbitmqService.status(payload.key);
    return this.ack(context);
  }
}
