import { JwtModule } from "@nestjs/jwt";
import { RestModule } from "../../../common/rest/rest-module";
import { env } from "../../../config/env";
import { PrismaModule } from "../../../providers/prisma/prisma.module";
import { ManagementCompanyModule } from "../management-company/management-company.module";
import { ManagementUserModule } from "../management-users/management-user.module";
import { AuthController } from "./management-auth.controller";
import { AuthService } from "./management-auth.service";
import { ManagementAuthRepository } from "./repository/management-auth.interface";
import { ManagementAuthRepositoryPrisma } from "./repository/management-auth.prisma";

@RestModule({
  imports: [
    PrismaModule,
    ManagementUserModule,
    ManagementCompanyModule,
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: ManagementAuthRepository,
      useClass: ManagementAuthRepositoryPrisma,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
