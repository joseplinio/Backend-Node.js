import type { IUserRepository } from "src/aplication/interface/repositories/IUserRepository"
import { inject, injectable } from "tsyringe"
import type { IUseCase } from "../../../interface/cases/IUseCase"

@injectable()
export class UserListCase implements IUseCase<any, object[] | null> {
	constructor(
		@inject("UserRepository") private userRepository: IUserRepository,
	) {}

	async handler(_body: any): Promise<object[] | null> {
		const listResult = this.userRepository.listAll()
		return listResult
	}
}
