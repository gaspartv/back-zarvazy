import { UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { FastifyRequest } from "fastify";
import geoip from "geoip-lite";
import { RestService } from "../../../common/rest/rest-service";
import dayjs from "../../../config/dayjs";
import { env } from "../../../config/env";
import { Bcrypt } from "../../../utils/bcrypt.util";
import { Crypto } from "../../../utils/crypto.util";
import { ManagementCompanyService } from "../management-company/management-company.service";
import { ManagementUserService } from "../management-users/management-user.service";
import { ManagementAuthRepository } from "./repository/management-auth.interface";

@RestService()
export class AuthService {
  constructor(
    private readonly managementUserService: ManagementUserService,
    private readonly managementCompanyService: ManagementCompanyService,
    private readonly jwtService: JwtService,
    private readonly repository: ManagementAuthRepository,
  ) {}

  async signIn(
    username: string,
    password: string,
    req: FastifyRequest extends { deviceId: string } ? FastifyRequest : any,
  ) {
    username = Crypto.hash(username);
    const managementUserFound =
      await this.managementUserService.findByUsername(username);

    if (!managementUserFound) {
      throw new UnauthorizedException("Invalid username or password");
    }

    const isPasswordValid = await Bcrypt.compare(
      password,
      managementUserFound.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid username or password");
    }

    const managementCompany = await this.managementCompanyService.findById(
      managementUserFound.managementCompanyId,
    );
    if (!managementCompany) {
      throw new UnauthorizedException("Invalid username or password");
    }

    const userAgent = req.raw.headers["user-agent"];
    const ipAddress = req.raw.socket.remoteAddress;
    const geo = geoip.lookup(ipAddress);
    const location = geo ? `${geo.city}, ${geo.country}` : "Unknown location";
    const sessionSource = req.raw.headers["referer"] || "Direct access";

    const managementUserSession =
      await this.repository.createManagementUserSession({
        expiresAt: dayjs()
          .add(Number(env.SESSION_EXPIRES_IN_DAYS), "days")
          .toDate(),
        isPersistent: false,
        managementUserId: managementUserFound.id,
        ipAddress,
        lastAccessedAt: dayjs().toDate(),
        location,
        sessionSource,
        userAgent,
      });

    console.log(managementUserSession);

    const accessPayload = {
      sub: managementUserFound.id,
      username: managementUserFound.usernameHash,
      instance: "management",
    };

    const access_token = await this.jwtService.signAsync(accessPayload);

    const refreshPayload = {
      sub: managementUserFound.id,
      username: managementUserFound.usernameHash,
      instance: "management",
    };

    const refresh_token = await this.jwtService.signAsync(refreshPayload);

    const days = Number(env.REFRESH_TOKEN_EXPIRES_IN_DAYS);

    await this.repository.createManagementUserRefreshToken({
      token: refresh_token,
      expiresAt: dayjs().add(days, "days").toDate(),
      metadata: {
        notation: "management",
      },
      managementUserSessionId: managementUserSession.id,
    });

    return { access_token, refresh_token };
  }
}
