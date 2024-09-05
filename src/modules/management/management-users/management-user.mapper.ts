import { UTCEnum } from "../../../common/enums/utc.enum";
import dayjs from "../../../config/dayjs";
import { ManagementUserDbDto } from "./dtos/management-user-db.dto";
import { ManagementUserResponseDto } from "./dtos/management-user-response.dto";

export class ManagementUserMapper {
  static handle(
    managementUser: ManagementUserDbDto,
    utc: UTCEnum,
  ): ManagementUserResponseDto {
    return {
      id: managementUser.id,
      code: managementUser.code,
      createdAt: dayjs(managementUser.createdAt).tz(utc).format(),
      updatedAt: dayjs(managementUser.updatedAt).tz(utc).format(),
      disabledAt: managementUser.disabledAt
        ? dayjs(managementUser.disabledAt).tz(utc).format()
        : null,
      lastLoginAt: managementUser.lastLoginAt
        ? dayjs(managementUser.lastLoginAt).tz(utc).format()
        : null,
      type: managementUser.type,
      police: managementUser.police,
      usernameHash: managementUser.usernameHash,
      emailHash: managementUser.emailHash,
      nationalIdHash: managementUser.nationalIdHash,
      phoneNumberHash: managementUser.phoneNumberHash,
      countryCode: managementUser.countryCode,
      birthDate: managementUser.birthDate
        ? dayjs(managementUser.birthDate).tz(utc).format("YYYY-MM-DD")
        : null,
      firstName: managementUser.firstName,
      lastName: managementUser.lastName,
      avatarUri: managementUser.avatarUri,
      language: managementUser.language,
      darkMode: managementUser.darkMode,
      dateFormat: managementUser.dateFormat,
      permissions: managementUser.permissions,
      lastPasswordChangeAt: managementUser.lastPasswordChangeAt
        ? dayjs(managementUser.lastPasswordChangeAt).tz(utc).format()
        : null,
      twoFactorEnabled: managementUser.twoFactorEnabled,
    };
  }
}
