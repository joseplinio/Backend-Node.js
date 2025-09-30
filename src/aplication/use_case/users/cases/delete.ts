import type { IUseCase } from "src/aplication/interface/cases/IUseCase"
import { IUserRepository } from "src/aplication/interface/repositories/IUserRepository"
import { inject, injectable } from "tsyringe"

@injectable()
export class UserDeleteCase implements IUseCase<string, void> {
	constructor(
		@inject("UserRepository") private userRepository: IUserRepository,
	) {}

	async handler(body: string): Promise<void> {
		return this.userRepository.delete(body)
	}
}
