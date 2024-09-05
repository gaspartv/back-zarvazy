import { RestModule } from "../../../common/rest/rest-module";
import { PrismaModule } from "../../../providers/prisma/prisma.module";
import { ManagementCompanyController } from "./management-company.controller";
import { ManagementCompanyService } from "./management-company.service";
import { ManagementCompanyRepository } from "./repository/management-company.interface";
import { ManagementCompanyRepositoryPrisma } from "./repository/management-company.prisma";

@RestModule({
  imports: [PrismaModule],
  controllers: [ManagementCompanyController],
  providers: [
    {
      provide: ManagementCompanyRepository,
      useClass: ManagementCompanyRepositoryPrisma,
    },
    ManagementCompanyService,
  ],
  exports: [ManagementCompanyService],
})
export class ManagementCompanyModule {}
