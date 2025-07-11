import type { UserEntity } from "src/domains/user-entity"
import type { IUseCase } from "../case"
import { inject, injectable } from "tsyringe"
import type { IUserRepository } from "src/aplication/interface/repository/IUserRepository"
import type { IDtoLoginUser } from "src/aplication/interface/dto/ILoginUserDto"
import type { IHashPassword } from "src/aplication/service/password/IHashPassword"

@injectable()
export class UserLoginCase
	implements IUseCase<IDtoLoginUser, UserEntity | null>
{
	constructor(
		@inject("UserRepository") private userRepository: IUserRepository,
		@inject("serviceHashPassword") private serviceHashPassword: IHashPassword,
	) {}
	async handler(body: IDtoLoginUser): Promise<UserEntity | null> {
		// Acredito que eu posso fazer isso pois é um useCase ele e feito para isso
		// e melhor que colocar no controller ;]

		const user = await this.userRepository.findByEmail(body.email)
		if (!user || !user.hashpasswd) {
			// usuário não encontrado ou hash faltando
			return null
		}
		const isValid = await this.serviceHashPassword.verifyPassword(
			user?.hashpasswd,
			body.passwd,
		)

		if (!isValid) throw new Error("Return of isValid: " + isValid)

		return user
		// e sim isso é nitidamente guambiara!
	}
}
