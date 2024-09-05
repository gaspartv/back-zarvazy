import { RestModule } from "../../../common/rest/rest-module";
import { PrismaModule } from "../../../providers/prisma/prisma.module";
import { ManagementUserService } from "./management-user.service";
import { ManagementUserRepository } from "./repository/management-user.interface";
import { ManagementUserRepositoryPrisma } from "./repository/management-user.prisma";

@RestModule({
  imports: [PrismaModule],
  controllers: [],
  providers: [
    ManagementUserService,
    {
      provide: ManagementUserRepository,
      useClass: ManagementUserRepositoryPrisma,
    },
  ],
  exports: [ManagementUserService],
})
export class ManagementUserModule {}
