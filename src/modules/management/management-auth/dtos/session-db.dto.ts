export class ManagementUserSessionDbDto {
  id: string;
  createdAt: Date;
  expiresAt: Date;
  revokedAt?: Date | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  lastAccessedAt?: Date | null;
  deviceId?: string | null;
  isPersistent: boolean;
  location?: string | null;
  browserFingerprint?: string | null;
  sessionSource?: string | null;
  managementUserId: string;
}
