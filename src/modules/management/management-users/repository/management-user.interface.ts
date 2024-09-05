import { ManagementUserDbDto } from "../dtos/management-user-db.dto";

export abstract class ManagementUserRepository {
  abstract findById(id: string): Promise<ManagementUserDbDto>;
  abstract findByUsername(username: string): Promise<ManagementUserDbDto>;
}
