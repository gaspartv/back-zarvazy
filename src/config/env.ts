import "dotenv/config";
import { z } from "zod";

const passwordRequirement = new RegExp(
  process.env.PASSWORD_REQUIREMENT as string,
);

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "testing", "homologation", "production"]),
  PORT: z.coerce.number(),
  RABBITMQ_NAME: z.string(),
  RABBITMQ_URL: z.string().url(),
  RABBITMQ_SEND: z.string(),
  RABBITMQ_RECEIVED: z.string(),
  SECURITY_ALGORITHM: z.string(),
  SECURITY_SECRET: z.string(),
  SECURITY_SALT: z.coerce.number(),
  SALT_OR_ROUNDS: z.coerce.number(),
  JWT_SECRET: z.string(),
  REFRESH_TOKEN_EXPIRES_IN_DAYS: z.coerce.string(),
  SESSION_EXPIRES_IN_DAYS: z.coerce.string(),

  SEED_MANAGEMENT_USER_PASSWORD: z.string(),
  SEED_MANAGEMENT_USER_USERNAME: z.string(),
  SEED_MANAGEMENT_USER_EMAIL: z.string(),
  SEED_MANAGEMENT_USER_NATIONAL_ID: z.string(),
  SEED_MANAGEMENT_USER_COUNTRY_CODE: z.string(),
  SEED_MANAGEMENT_USER_PHONE_NUMBER: z.string(),
  SEED_MANAGEMENT_USER_FIRST_NAME: z.string(),
  SEED_MANAGEMENT_USER_LAST_NAME: z.string(),
  SEED_MANAGEMENT_USER_BIRTH_DATE: z.string(),
  SEED_MANAGEMENT_USER_MANAGEMENT_AVATAR: z.string(),

  SEED_PARENT_COMPANY_DESCRIPTION: z.string(),
  SEED_PARENT_COMPANY_SOCIAL_REASON: z.string(),
  SEED_PARENT_COMPANY_FANTASY_NAME: z.string(),
  SEED_PARENT_COMPANY_TAX_IDENTIFICATION_NUMBER: z.string(),
  SEED_PARENT_COMPANY_EMAIL: z.string().email(),
  SEED_PARENT_COMPANY_PHONE_NUMBER: z.string(),
  SEED_PARENT_COMPANY_WEBSITE: z.string().url(),
  SEED_PARENT_COMPANY_LOGO_URI: z.string(),
  SEED_PARENT_COMPANY_INDUSTRY: z.string(),
  SEED_PARENT_COMPANY_ADDRESS_NAME: z.string(),
  SEED_PARENT_COMPANY_ADDRESS_STREET: z.string(),
  SEED_PARENT_COMPANY_ADDRESS_NUMBER: z.string(),
  SEED_PARENT_COMPANY_ADDRESS_COMPLEMENT: z.string(),
  SEED_PARENT_COMPANY_ADDRESS_NEIGHBORHOOD: z.string(),
  SEED_PARENT_COMPANY_ADDRESS_CITY: z.string(),
  SEED_PARENT_COMPANY_ADDRESS_STATE: z.string(),
  SEED_PARENT_COMPANY_ADDRESS_ZIP_CODE: z.string(),
  SEED_PARENT_COMPANY_ADDRESS_COUNTRY: z.string(),
  SEED_PARENT_COMPANY_ADDRESS_LATITUDE: z.coerce.number(),
  SEED_PARENT_COMPANY_ADDRESS_LONGITUDE: z.coerce.number(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables.");
}

const env = _env.data;

export { env };
