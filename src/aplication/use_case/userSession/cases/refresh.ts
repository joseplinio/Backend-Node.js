import type { IUseCase } from "src/aplication/interface/case/IUseCase"
import type { IJwtPayload } from "src/aplication/interface/dto/services/jwt/IJwtPayload"
import type { IManager } from "src/aplication/interface/manager/IManager"
import type { IUserSessionRepository } from "src/aplication/interface/repositories/IUserSessionRepository"
import type { IJwtService } from "src/aplication/interface/service/jwt/IJwtService"
import { inject, injectable } from "tsyringe"
import type { DtoRefreshToken } from "../../../interface/dto/services/jwt/dto/dtoRefreshToken"

@injectable()
export class RefreshTokenCase
	implements IUseCase<object | undefined, object | null>
{
	constructor(
		@inject("JwtService") private jwtService: IJwtService,
		@inject("UserSessionRepository")
		private userSessionRepository: IUserSessionRepository,
		@inject("UserSessionManager")
		private userSessionManager: IManager<IJwtPayload, object>,
	) {}
	async handler(dto: DtoRefreshToken): Promise<object | null> {
		try {
			if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET)
				throw new Error(
					"Erro in the RefreshTokenCase [it dosen't the secret keys]",
				)
			const refreshToken = dto.loginResult.refreshToken

			const authTokenResult = await this.jwtService.authToken(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET,
			)

			const userSession = await this.userSessionRepository.findByID(
				authTokenResult.userID,
			)

			if (userSession?.refreshID === undefined)
				throw new Error(
					"Erro in the RefreshTokenCase [useSession.refreshID = undefined]",
				)
			const isRevoked = await this.userSessionRepository.isRevokedToken(
				userSession?.refreshID,
				"refresh",
			)

			if (isRevoked)
				throw new Error("Erro in the RefreshTokenCase [Token revoked]")

			const newUserSession =
				await this.userSessionManager.handler(authTokenResult)
			await this.userSessionManager.handler(authTokenResult)

			return newUserSession
		} catch (err) {
			console.log(err)
			throw new Error("Internal Erro in the RefreshTokenCase")
		}
	}
}
