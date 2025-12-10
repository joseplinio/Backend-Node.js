import { DtoRefreshToken } from "src/aplication/interface/dto/services/jwt/dto/dtoRefreshToken"
import type { IJwtService } from "src/aplication/interface/service/jwt/IJwtService"
import type { UserSessionEntity } from "src/domains/userSession-entity"
import { inject, injectable } from "tsyringe"
import type { IUseCase } from "../../../interface/case/IUseCase"
import type { UserSessionFindCase } from "../../userSession/cases/session/find"

@injectable()
export class UserLogoutCase implements IUseCase<DtoRefreshToken, void> {
	constructor(
		@inject("UserSessionFindCase")
		private userSessionFindCase: UserSessionFindCase,
		@inject("UserSessionDeleteCase")
		private userSessionDeleteCase: IUseCase<UserSessionEntity, void>,
		@inject("JwtService") private jwtService: IJwtService,
	) {}
	async handler(dto: DtoRefreshToken): Promise<void> {
		try {
			if (!process.env.REFRESH_TOKEN_SECRET)
				throw new Error("Erro in the JwtTokens [it dosen't the secret keys]")

			const payload = await this.jwtService.authToken(
				dto.loginResult.refreshToken,
				process.env.REFRESH_TOKEN_SECRET,
			)

			const userSession = await this.userSessionFindCase.handler(payload)

			if (!userSession)
				throw new Error("The Server doesn't has the userSession for the Logout")

			const deleteResult = await this.userSessionDeleteCase.handler(userSession)

			return deleteResult
		} catch (err) {
			console.log(err)
			throw new Error("Internal error in the UserLogoutCase: ")
		}
	}
}
