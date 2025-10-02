import type { IUserRepository } from "src/aplication/interface/repositories/IUserRepository"
import { inject, injectable } from "tsyringe"
import type { IUseCase } from "../../../interface/cases/IUseCase"
import type { DtoFindUser } from "../dto/dtoFindUser"

@injectable()
export class UserFindCase implements IUseCase<DtoFindUser, object[] | null> {
	constructor(
		@inject("UserRepository") private userRepository: IUserRepository,
	) {}

	async handler(body: DtoFindUser): Promise<object[] | null> {
		const queryResult = this.userRepository.findAny(body)

		return queryResult
	}
}
