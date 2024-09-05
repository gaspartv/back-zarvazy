export class CreateManagementUserSessionDto {
  expiresAt: Date;
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
