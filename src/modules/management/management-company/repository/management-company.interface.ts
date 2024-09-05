import { ManagementCompanyDbDto } from "../dtos/management-company-db.dto";

export abstract class ManagementCompanyRepository {
  abstract findById(id: string): Promise<ManagementCompanyDbDto>;
}
