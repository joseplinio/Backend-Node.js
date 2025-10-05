import type { IDtoLoginUser } from "src/aplication/interface/dto/auth/ILoginUserDto"
import type { IJwtSession } from "src/aplication/interface/dto/services/jwt/IJwtManeger"
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
		@inject("JwtSession")
		private jwtSession: IJwtSession<UserEntity, object>,
		@inject("UserRepository") private userRepository: IUserRepository,
		@inject("UserSessionAddCase")
		private userSessionAddCase: IUseCase<UserEntity, void>,
	) {}
	async handler(body: IDtoLoginUser): Promise<object> {
		try {
			const userInstace = await this.userRepository.findByEmail(body.email)
			if (!userInstace)
				throw new Error("Erro in the handler (UserLoginCase) - [bad request]")

			await this.hashManeger.validePasswd(userInstace?.hashpasswd, body.passwd)

			const loginResult = await this.jwtSession.makeSession(userInstace)
			await this.userSessionAddCase.handler(userInstace)

			return loginResult
		} catch (err) {
			console.log(err)
			throw new Error("Internal Erro in the LoginCase")
		}
	}
}
