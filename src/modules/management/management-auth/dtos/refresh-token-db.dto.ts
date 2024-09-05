export class RefreshTokenDbDto {
  id: string;
  token: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt: Date;
  metadata: any;
  managementUserSessionId: string;
}
