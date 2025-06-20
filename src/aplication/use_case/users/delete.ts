import { inject, injectable } from "tsyringe"
import type { UserEntity } from "../../../domains/user-entity"
import { IUserRepository } from "../../interface/repository/IUserRepository"
import type { IUseCase } from "../case"

@injectable()
export class UserDeleteCase implements IUseCase<string, UserEntity> {
	constructor(
		@inject("UserRepository") private userRepository: IUserRepository,
	) {}
	handler(body: string): Promise<UserEntity> {
		return this.userRepository.delete(body)
	}
}
