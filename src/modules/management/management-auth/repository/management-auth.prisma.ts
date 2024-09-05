import { RestRepository } from "../../../../common/rest/rest-repository";
import { PrismaService } from "../../../../providers/prisma/prisma.service";
import { CreateManagementRefreshTokenDto } from "../dtos/create-refresh-token.dto";
import { CreateManagementUserSessionDto } from "../dtos/create-session.dto";
import { RefreshTokenDbDto } from "../dtos/refresh-token-db.dto";
import { ManagementUserSessionDbDto } from "../dtos/session-db.dto";
import { ManagementAuthRepository } from "./management-auth.interface";

@RestRepository()
export class ManagementAuthRepositoryPrisma
  implements ManagementAuthRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async createManagementUserSession(
    data: CreateManagementUserSessionDto,
  ): Promise<ManagementUserSessionDbDto> {
    return await this.prisma.managementUserSession.create({
      data,
    });
  }

  async createManagementUserRefreshToken(
    data: CreateManagementRefreshTokenDto,
  ): Promise<RefreshTokenDbDto> {
    return await this.prisma.managementRefreshToken.create({
      data,
    });
  }
}
