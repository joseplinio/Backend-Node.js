import type { IUserRepository } from "src/aplication/interface/repositories/IUserRepository"
import type { UserEntity } from "src/domains/user-entity"
import { inject, injectable } from "tsyringe"
import type { IUseCase } from "../../../interface/cases/IUseCase"

@injectable()
export class UserListCase implements IUseCase<any, UserEntity[] | null> {
	constructor(
		@inject("UserRepository") private userRepository: IUserRepository,
	) {}

	async handler(_body: any): Promise<UserEntity[] | null> {
		const listResult = this.userRepository.listAll()
		return listResult
	}
}
