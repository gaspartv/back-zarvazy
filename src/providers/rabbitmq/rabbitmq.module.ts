import {
  Transport,
  ClientsModule as TransportClientsModule,
} from "@nestjs/microservices";
import { RestModule } from "../../common/rest/rest-module";
import { env } from "../../config/env";
import { RabbitMQConsumer } from "./rabbitmq.consumer";
import { RabbitmqService } from "./rabbitmq.service";

@RestModule({
  imports: [
    TransportClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: env.RABBITMQ_NAME,
          useFactory: () => ({
            transport: Transport.RMQ,
            options: {
              urls: [env.RABBITMQ_URL],
              queue: env.RABBITMQ_SEND,
              queueOptions: { durable: true },
            },
          }),
        },
      ],
    }),
  ],
  controllers: [RabbitMQConsumer],
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {}
