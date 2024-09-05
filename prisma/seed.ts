import { PrismaClient } from "@prisma/client";
import { AddressEnum } from "../src/common/enums/address.enum";
import { ManagementUserPoliceEnum } from "../src/common/enums/management/user-police.enum";
import { ManagementUserTypeEnum } from "../src/common/enums/management/user-type.enum";
import { TaxIdentificationEnum } from "../src/common/enums/tax-identification.enum";
import { UTCEnum } from "../src/common/enums/utc.enum";
import dayjs from "../src/config/dayjs";
import { env } from "../src/config/env";
import { Bcrypt } from "../src/utils/bcrypt.util";
import { Crypto } from "../src/utils/crypto.util";
import { Generate } from "../src/utils/generate.util";
import { Security } from "../src/utils/security.util";

const prisma = new PrismaClient();

const generateUserDate = async () => {
  return {
    code: Generate.code(),
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
    type: ManagementUserTypeEnum.OWNER,
    police: ManagementUserPoliceEnum.SUPER,

    username: Crypto.hash(env.SEED_MANAGEMENT_USER_USERNAME),
    usernameHash: Security.encrypt(env.SEED_MANAGEMENT_USER_USERNAME),

    email: Crypto.hash(env.SEED_MANAGEMENT_USER_EMAIL),
    emailHash: Security.encrypt(env.SEED_MANAGEMENT_USER_EMAIL),

    nationalId: Crypto.hash(env.SEED_MANAGEMENT_USER_NATIONAL_ID),
    nationalIdHash: Security.encrypt(env.SEED_MANAGEMENT_USER_NATIONAL_ID),

    phoneNumber: Crypto.hash(env.SEED_MANAGEMENT_USER_PHONE_NUMBER),
    phoneNumberHash: Security.encrypt(env.SEED_MANAGEMENT_USER_PHONE_NUMBER),

    passwordHash: await Bcrypt.hash(env.SEED_MANAGEMENT_USER_PASSWORD),

    countryCode: env.SEED_MANAGEMENT_USER_COUNTRY_CODE,
    birthDate: dayjs(env.SEED_MANAGEMENT_USER_BIRTH_DATE)
      .set("hour", 0)
      .toDate(),
    firstName: env.SEED_MANAGEMENT_USER_FIRST_NAME,
    lastName: env.SEED_MANAGEMENT_USER_LAST_NAME,
    avatarUri: env.SEED_MANAGEMENT_USER_MANAGEMENT_AVATAR,
    isVerified: true,
  };
};

const generateParentCompanyData = async () => {
  return {
    code: Generate.code(),
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
    description: env.SEED_PARENT_COMPANY_DESCRIPTION,
    socialReason: env.SEED_PARENT_COMPANY_SOCIAL_REASON,
    fantasyName: env.SEED_PARENT_COMPANY_FANTASY_NAME,
    taxIdentificationType: TaxIdentificationEnum.CNPJ,

    taxIdentificationNumber: Crypto.hash(
      env.SEED_PARENT_COMPANY_TAX_IDENTIFICATION_NUMBER,
    ),
    taxIdentificationNumberHash: Security.encrypt(
      env.SEED_PARENT_COMPANY_TAX_IDENTIFICATION_NUMBER,
    ),

    email: Crypto.hash(env.SEED_PARENT_COMPANY_EMAIL),
    emailHash: Security.encrypt(env.SEED_PARENT_COMPANY_EMAIL),

    phoneNumber: Crypto.hash(env.SEED_PARENT_COMPANY_PHONE_NUMBER),
    phoneNumberHash: Security.encrypt(env.SEED_PARENT_COMPANY_PHONE_NUMBER),

    website: env.SEED_PARENT_COMPANY_WEBSITE,
    logoUri: env.SEED_PARENT_COMPANY_LOGO_URI,
    industry: env.SEED_PARENT_COMPANY_INDUSTRY,
    employeeCount: 1,
    utc: UTCEnum.AMERICA_NOVA_YORK,
  };
};

const generateParentCompanyAddressData = () => {
  return {
    createdAt: dayjs().toDate(),
    updatedAt: dayjs().toDate(),
    name: env.SEED_PARENT_COMPANY_ADDRESS_NAME,
    addressType: AddressEnum.COMMERCIAL,
    street: env.SEED_PARENT_COMPANY_ADDRESS_STREET,
    number: env.SEED_PARENT_COMPANY_ADDRESS_NUMBER,
    complement: env.SEED_PARENT_COMPANY_ADDRESS_COMPLEMENT,
    neighborhood: env.SEED_PARENT_COMPANY_ADDRESS_NEIGHBORHOOD,
    city: env.SEED_PARENT_COMPANY_ADDRESS_CITY,
    state: env.SEED_PARENT_COMPANY_ADDRESS_STATE,
    zipCode: env.SEED_PARENT_COMPANY_ADDRESS_ZIP_CODE,
    country: env.SEED_PARENT_COMPANY_ADDRESS_COUNTRY,
    latitude: env.SEED_PARENT_COMPANY_ADDRESS_LATITUDE,
    longitude: env.SEED_PARENT_COMPANY_ADDRESS_LONGITUDE,
  };
};

const seed = async () => {
  // MANAGEMENT COMPANY //
  const managementCompanyFound = await prisma.managementCompany.findFirst();
  if (managementCompanyFound) {
    console.info("Database already seeded");
    return;
  }

  await prisma.$transaction(async (tx) => {
    const managementCompanyData = {
      utc: UTCEnum.AMERICA_SAO_PAULO,
    };

    const managementCompany = await tx.managementCompany.create({
      data: managementCompanyData,
    });
    if (!managementCompany) return;

    // MANAGEMENT USER //
    const managementUserData = await generateUserDate();
    const managementUser = await tx.managementUser.create({
      data: {
        ...managementUserData,
        managementCompanyId: managementCompany.id,
      },
    });
    if (!managementUser) return;

    const parentCompanyData = await generateParentCompanyData();
    const parentCompany = await tx.parentCompany.create({
      data: {
        ...parentCompanyData,
        managementCompanyId: managementCompany.id,
      },
    });
    if (!parentCompany) return;

    const parentCompanyAddressData = generateParentCompanyAddressData();
    await tx.address.create({
      data: {
        ...parentCompanyAddressData,
        parentCompanyId: parentCompany.id,
      },
    });

    const parentUserData = await generateUserDate();
    await tx.user.create({
      data: { ...parentUserData, parentCompanyId: parentCompany.id },
    });

    console.log("🌱 Seed completed");
  });
};

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
