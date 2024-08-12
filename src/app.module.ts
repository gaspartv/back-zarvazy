import { ConfigModule } from "@nestjs/config";
import { RestModule } from "./common/rest/rest-module";
import { RabbitmqModule } from "./providers/rabbitmq/rabbitmq-module";

@RestModule({
  imports: [
    RabbitmqModule,

    ConfigModule.forRoot({
      isGlobal: true,
      validationOptions: { allowUnknown: false },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
