export class CreateManagementRefreshTokenDto {
  token: string;
  expiresAt: Date;
  metadata: any;
  managementUserSessionId: string;
}
