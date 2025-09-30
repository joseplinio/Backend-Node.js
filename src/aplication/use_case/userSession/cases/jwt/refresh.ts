import type { IUseCase } from "src/aplication/interface/cases/IUseCase"
import type { IUserSessionRepository } from "src/aplication/interface/repositories/IUserSessionRespository"
import type { IJwtService } from "src/aplication/interface/service/jwt/IJwtService"
import type { IJwtPayload } from "src/aplication/service/auth/jwt/interface/IJwtPayload"
import type { IJwtSession } from "src/aplication/service/auth/jwt/interface/managers/IJwtManeger"
import { inject, injectable } from "tsyringe"
import type { DtoRefreshToken } from "./dto/dtoRefreshToken"

@injectable()
export class RefreshTokenCase
	implements IUseCase<object | undefined, object | null>
{
	constructor(
		@inject("JwtService") private jwtService: IJwtService,
		@inject("UserSessionRepository")
		private userSessionRepository: IUserSessionRepository,
		@inject("JwtSession") private jwtSession: IJwtSession<object, object>,
		@inject("UserSessionAddCase")
		private userSessionAddCase: IUseCase<IJwtPayload, void>,
	) {}
	async handler(dto: DtoRefreshToken): Promise<object | null> {
		try {
			if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET)
				throw new Error(
					"Erro in the RefreshTokenCase [it dosen't the secret keys]",
				)
			const refreshToken = dto.loginResult.refreshToken

			const payload = await this.jwtService.authToken(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET,
			)

			const userSession = await this.userSessionRepository.findByID(payload.id)

			if (userSession?.refreshID === undefined)
				throw new Error(
					"Erro in the RefreshTokenCase [useSession.refreshID = undefined]",
				)

			const isRevoked = await this.userSessionRepository.isRevokedToken(
				userSession?.refreshID,
				"refresh",
			)
			if (isRevoked)
				throw new Error("Erro in the RefreshTokenCase [Tokne revoked]")

			const newUserSession = await this.jwtSession.makeSession(payload)

			await this.userSessionRepository.deleteByID(payload.id)


			await this.userSessionAddCase.handler(payload)

			return newUserSession
		} catch (err) {
			console.log(err)
			throw new Error("Internal Erro in the RefreshTokenCase")
		}
	}
}
