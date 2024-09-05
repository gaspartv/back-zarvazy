import { RestRepository } from "../../../../common/rest/rest-repository";
import { PrismaService } from "../../../../providers/prisma/prisma.service";
import { ManagementUserDbDto } from "../dtos/management-user-db.dto";
import { ManagementUserRepository } from "./management-user.interface";

@RestRepository()
export class ManagementUserRepositoryPrisma
  implements ManagementUserRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ManagementUserDbDto> {
    return await this.prisma.managementUser.findFirst({
      where: { id },
    });
  }

  async findByUsername(username: string): Promise<ManagementUserDbDto> {
    return await this.prisma.managementUser.findFirst({
      where: { username },
    });
  }
}
