import { CreateManagementRefreshTokenDto } from "../dtos/create-refresh-token.dto";
import { CreateManagementUserSessionDto } from "../dtos/create-session.dto";
import { RefreshTokenDbDto } from "../dtos/refresh-token-db.dto";
import { ManagementUserSessionDbDto } from "../dtos/session-db.dto";

export abstract class ManagementAuthRepository {
  abstract createManagementUserSession(
    data: CreateManagementUserSessionDto,
  ): Promise<ManagementUserSessionDbDto>;

  abstract createManagementUserRefreshToken(
    data: CreateManagementRefreshTokenDto,
  ): Promise<RefreshTokenDbDto>;
}
