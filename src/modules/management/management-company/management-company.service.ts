import { RestService } from "../../../common/rest/rest-service";
import { ManagementCompanyDbDto } from "./dtos/management-company-db.dto";
import { ManagementCompanyRepository } from "./repository/management-company.interface";

@RestService()
export class ManagementCompanyService {
  constructor(private readonly repository: ManagementCompanyRepository) {}

  async findById(id: string): Promise<ManagementCompanyDbDto> {
    return await this.repository.findById(id);
  }
}
