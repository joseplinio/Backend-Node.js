import { inject, injectable } from "tsyringe"
import { UserRepository } from "../../../adapters/spi/repositories/user-repository"
import type { UserEntity } from "../../../domains/user-entity"
import { IUserRepository } from "../../interface/repository/IUserRepository"
import type { IUseCase } from "../case"

@injectable() // Permite que o container injete coisas nessa classe
export class UserAddCase implements IUseCase<UserEntity, UserEntity> {
	// Pesso para montar a class com o UserRepository ja injetando sem fazer um new
	constructor(
		@inject(UserRepository) private userRepository: IUserRepository,
	) {}

	handler(body: UserEntity): Promise<UserEntity> {
		return this.userRepository.add(body)
	}
}
