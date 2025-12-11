import type { IDtoLoginUser } from "src/aplication/interface/dto/auth/ILoginUserDto"
import type { IManager } from "src/aplication/interface/manager/IManager"
import type { IUserRepository } from "src/aplication/interface/repositories/IUserRepository"
import type { IHashManeger } from "src/aplication/interface/service/hash/menager/IHashMenager"
import type { UserEntity } from "src/domains/user-entity"
import { inject, injectable } from "tsyringe"
import type { IUseCase } from "../../../interface/case/IUseCase"

@injectable()
export class UserLoginCase implements IUseCase<IDtoLoginUser, object> {
	constructor(
		@inject("HashManeger")
		private hashManeger: IHashManeger,
		@inject("UserRepository") private userRepository: IUserRepository,
		@inject("UserSessionManager")
		private userSessionManager: IManager<UserEntity, object>,
	) {}
	async handler(dto: IDtoLoginUser): Promise<object> {
		try {
			const userInstace = await this.userRepository.findByEmail(dto.email)
			if (!userInstace)
				throw new Error("Erro in the handler (UserLoginCase) - [bad request]")

			await this.hashManeger.validePasswd(userInstace?.hashpasswd, dto.passwd)

			const loginResult = await this.userSessionManager.handler(userInstace)
			return loginResult

    } catch (err) {
			console.log(err)
			throw new Error("Internal Erro in the LoginCase")
		}
	}
}
