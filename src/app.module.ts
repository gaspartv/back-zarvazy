import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { RestModule } from "./common/rest/rest-module";
import { AuthModule } from "./modules/management/management-auth/management-auth.module";
import { ManagementCompanyModule } from "./modules/management/management-company/management-company.module";
import { ManagementUserModule } from "./modules/management/management-users/management-user.module";
import { RabbitmqModule } from "./providers/rabbitmq/rabbitmq.module";

@RestModule({
  imports: [
    RabbitmqModule,
    ManagementUserModule,
    AuthModule,
    ManagementCompanyModule,

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
