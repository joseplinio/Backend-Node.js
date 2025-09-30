import { randomUUID } from "crypto"
import type { IUseCase } from "src/aplication/interface/cases/IUseCase"
import type { CreateUserModel } from "src/aplication/interface/dto/TyCreaterUser"
import type { IHashService } from "src/aplication/interface/service/hash/IHashService"
import { inject, injectable } from "tsyringe"
import { IUserRepository } from "../../../interface/repositories/IUserRepository"
import type { CreaterUserDtoRequest } from "../dto/dtoRequestUser"

@injectable()
export class UserAddCase implements IUseCase<CreaterUserDtoRequest, object> {
	constructor(
		@inject("UserRepository") private userRepository: IUserRepository,
		@inject("HashService") private hashService: IHashService,
	) {}

	async handler(body: CreaterUserDtoRequest): Promise<object> {
		const hashedPasswd = await this.hashService.hash(body.passwd)
		await this.hashService.hash(body.passwd)
		const createUser: CreateUserModel = {
			...body,
			id: randomUUID(),
			hashpasswd: hashedPasswd,
			admin: false,
		}
		if (!createUser) throw new Error("User couldn't be created [UserAddCase]")

		const addResult = await this.userRepository.add(createUser)
		if (typeof addResult === null)
			throw new Error("Error in the AddCase [Dosen't saved the user on db]")

		const user = {
			id: addResult.id,
			name: addResult.name,
			age: addResult.age,
			email: addResult.email,
			admin: addResult.admin,
		}
		return user
	}
}
