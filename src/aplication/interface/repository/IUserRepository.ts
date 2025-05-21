import type { UserEntity } from "../../../domains/user-entity"
import type { IRepository } from "./IRepository"

export interface IUserRepository extends IRepository<UserEntity, any> {}
