import type { IUseCase } from "src/aplication/interface/case/IUseCase"
import { IUserRepository } from "src/aplication/interface/repositories/IUserRepository"
import { inject, injectable } from "tsyringe"

@injectable()
export class UserDeleteCase implements IUseCase<string, void> {
	constructor(
		@inject("UserRepository") private userRepository: IUserRepository,
	) {}

	async handler(body: string): Promise<void> {
		try {
			return this.userRepository.delete(body)
		} catch (err) {
			console.log(err)
			throw new Error("Internal error in the UserDeleteCase: ")
		}
	}
}
