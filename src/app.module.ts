import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { RestModule } from "./common/rest/rest-module";
import { RabbitmqModule } from "./providers/rabbitmq/rabbitmq.module";

@RestModule({
  imports: [
    RabbitmqModule,

    ConfigModule.forRoot({
      isGlobal: true,
      validationOptions: { allowUnknown: false },
    }),
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
