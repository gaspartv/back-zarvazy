-- CreateTable
CREATE TABLE "ManagementCompany" (
    "id" TEXT NOT NULL,
    "utc" TEXT NOT NULL,

    CONSTRAINT "ManagementCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManagementUser" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(9) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disabledAt" TIMESTAMP(3),
    "lastLoginAt" TIMESTAMP(3),
    "type" TEXT NOT NULL DEFAULT 'MANAGER',
    "police" TEXT NOT NULL DEFAULT 'NORMAL',
    "username" TEXT NOT NULL,
    "usernameHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailHash" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "nationalIdHash" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "phoneNumberHash" TEXT,
    "passwordHash" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatarUri" TEXT,
    "language" TEXT NOT NULL DEFAULT 'PT_BR',
    "darkMode" BOOLEAN NOT NULL DEFAULT false,
    "dateFormat" TEXT NOT NULL DEFAULT 'DD-MM-YYYY HH:mm:ss',
    "permissions" TEXT[],
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationToken" TEXT,
    "resetPasswordToken" TEXT,
    "lastPasswordChangeAt" TIMESTAMP(3),
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "managementCompanyId" TEXT NOT NULL,

    CONSTRAINT "ManagementUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManagementUserSession" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "lastAccessedAt" TIMESTAMP(3),
    "isPersistent" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT,
    "sessionSource" TEXT,
    "managementUserId" TEXT NOT NULL,

    CONSTRAINT "ManagementUserSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManagementRefreshToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "managementUserSessionId" TEXT NOT NULL,

    CONSTRAINT "ManagementRefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParentCompany" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(9) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disabledAt" TIMESTAMP(3),
    "description" TEXT,
    "socialReason" TEXT NOT NULL,
    "fantasyName" TEXT NOT NULL,
    "taxIdentificationType" TEXT NOT NULL DEFAULT 'CNPJ',
    "taxIdentificationNumber" TEXT NOT NULL,
    "taxIdentificationNumberHash" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "phoneNumberHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailHash" TEXT NOT NULL,
    "website" TEXT,
    "logoUri" TEXT,
    "industry" TEXT NOT NULL,
    "employeeCount" INTEGER,
    "permissions" TEXT[],
    "utc" TEXT,
    "managementCompanyId" TEXT NOT NULL,

    CONSTRAINT "ParentCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "addressType" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "parentCompanyId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "code" VARCHAR(9) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "disabledAt" TIMESTAMP(3),
    "lastLoginAt" TIMESTAMP(3),
    "type" TEXT NOT NULL DEFAULT 'MANAGER',
    "police" TEXT NOT NULL DEFAULT 'NORMAL',
    "username" TEXT NOT NULL,
    "usernameHash" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailHash" TEXT NOT NULL,
    "nationalId" TEXT NOT NULL,
    "nationalIdHash" TEXT NOT NULL,
    "phoneNumber" TEXT,
    "phoneNumberHash" TEXT,
    "passwordHash" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "avatarUri" TEXT,
    "language" TEXT NOT NULL DEFAULT 'PT_BR',
    "darkMode" BOOLEAN NOT NULL DEFAULT false,
    "dateFormat" TEXT NOT NULL DEFAULT 'DD-MM-YYYY HH:mm:ss',
    "permissions" TEXT[],
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationToken" TEXT,
    "resetPasswordToken" TEXT,
    "lastPasswordChangeAt" TIMESTAMP(3),
    "twoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,
    "parentCompanyId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ManagementUser_username_key" ON "ManagementUser"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ManagementUser_email_key" ON "ManagementUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ManagementUser_nationalId_key" ON "ManagementUser"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "ManagementUser_phoneNumber_key" ON "ManagementUser"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ManagementRefreshToken_token_key" ON "ManagementRefreshToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "ParentCompany_taxIdentificationNumber_key" ON "ParentCompany"("taxIdentificationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ParentCompany_phoneNumber_key" ON "ParentCompany"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ParentCompany_email_key" ON "ParentCompany"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nationalId_key" ON "User"("nationalId");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- AddForeignKey
ALTER TABLE "ManagementUser" ADD CONSTRAINT "ManagementUser_managementCompanyId_fkey" FOREIGN KEY ("managementCompanyId") REFERENCES "ManagementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagementUserSession" ADD CONSTRAINT "ManagementUserSession_managementUserId_fkey" FOREIGN KEY ("managementUserId") REFERENCES "ManagementUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagementRefreshToken" ADD CONSTRAINT "ManagementRefreshToken_managementUserSessionId_fkey" FOREIGN KEY ("managementUserSessionId") REFERENCES "ManagementUserSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParentCompany" ADD CONSTRAINT "ParentCompany_managementCompanyId_fkey" FOREIGN KEY ("managementCompanyId") REFERENCES "ManagementCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_parentCompanyId_fkey" FOREIGN KEY ("parentCompanyId") REFERENCES "ParentCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_parentCompanyId_fkey" FOREIGN KEY ("parentCompanyId") REFERENCES "ParentCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
