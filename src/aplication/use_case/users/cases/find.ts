import type { IUserRepository } from "src/aplication/interface/repositories/IUserRepository"
import { inject, injectable } from "tsyringe"
import type { IUseCase } from "../../../interface/case/IUseCase"
import type { DtoFindUser } from "../dto/dtoFindUser"

@injectable()
export class UserFindCase implements IUseCase<DtoFindUser, object[] | null> {
	constructor(
		@inject("UserRepository") private userRepository: IUserRepository,
	) {}

	async handler(body: DtoFindUser): Promise<object[] | null> {
		try {
			const queryResult = this.userRepository.findAny(body)

			return queryResult
		} catch (err) {
			console.log(err)
			throw new Error("Internal error in the UserFindCase: ")
		}
	}
}
