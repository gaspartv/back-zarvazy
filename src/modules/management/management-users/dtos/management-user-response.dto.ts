export class ManagementUserResponseDto {
  id: string;
  code: string;
  createdAt: string;
  updatedAt: string;
  disabledAt: string | null;
  lastLoginAt: string | null;
  type: string;
  police: string;
  usernameHash: string;
  emailHash: string;
  nationalIdHash: string;
  phoneNumberHash: string | null;
  countryCode: string;
  birthDate: string | null;
  firstName: string;
  lastName: string;
  avatarUri: string | null;
  language: string;
  darkMode: boolean;
  dateFormat: string;
  permissions: string[];
  lastPasswordChangeAt: string | null;
  twoFactorEnabled: boolean;
}
