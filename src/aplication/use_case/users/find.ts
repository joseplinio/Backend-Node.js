import type { IUserRepository } from "src/aplication/interface/repository/IUserRepository"
import type { UserEntity } from "src/domains/user-entity"
import { inject, injectable } from "tsyringe"
import type { IUseCase } from "../case"

@injectable()
export class UserFindCase implements IUseCase<any, UserEntity[] | null> {
	constructor(
		@inject("UserRepository") private userRepository: IUserRepository,
	) {}
	handler(body: any): Promise<UserEntity[] | null> {
		return this.userRepository.findAny(body)
	}
}
