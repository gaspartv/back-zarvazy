import { RestRepository } from "../../../../common/rest/rest-repository";
import { PrismaService } from "../../../../providers/prisma/prisma.service";
import { ManagementCompanyDbDto } from "../dtos/management-company-db.dto";
import { ManagementCompanyRepository } from "./management-company.interface";

@RestRepository()
export class ManagementCompanyRepositoryPrisma
  implements ManagementCompanyRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ManagementCompanyDbDto> {
    return await this.prisma.managementCompany.findFirst({
      where: { id },
    });
  }
}
