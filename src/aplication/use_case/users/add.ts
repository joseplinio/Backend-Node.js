import { inject, injectable } from "tsyringe"
import { UserRepository } from "../../../adapters/spi/repositories/user-repository"
import type { UserEntity } from "../../../domains/user-entity"
import { IUserRepository } from "../../interface/repository/IUserRepository"
import type { IUseCase } from "../case"

@injectable()
export class UserAddCase implements IUseCase<UserEntity, UserEntity> {
	constructor(
		@inject(UserRepository) private userRepository: IUserRepository,
	) {}

	handler(body: UserEntity): Promise<UserEntity> {
		return this.userRepository.add(body)
	}
}
