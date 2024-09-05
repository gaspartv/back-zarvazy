import { RestService } from "../../../common/rest/rest-service";
import { ManagementUserDbDto } from "./dtos/management-user-db.dto";
import { ManagementUserRepository } from "./repository/management-user.interface";

@RestService()
export class ManagementUserService {
  constructor(private readonly repository: ManagementUserRepository) {}

  async findById(id: string): Promise<ManagementUserDbDto> {
    return await this.repository.findById(id);
  }

  async findByUsername(username: string): Promise<ManagementUserDbDto> {
    return await this.repository.findByUsername(username);
  }
}
