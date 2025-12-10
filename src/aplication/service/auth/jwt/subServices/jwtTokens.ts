import type { ITokensService } from "src/aplication/interface/dto/auth/IAccessTokenService"
import { IJwtPayload } from "src/aplication/interface/dto/services/jwt/IJwtPayload"
import type { IJwtTokens } from "src/aplication/interface/dto/services/jwt/IJwtSession"
import type { UserEntity } from "src/domains/user-entity"
import { inject, injectable } from "tsyringe"

@injectable()
export class JwtTokens implements IJwtTokens<UserEntity, object> {
	constructor(
		@inject("RefershTokenService")
		private refershTokenService: ITokensService,
		@inject("AccessTokenService")
		private accessTokenService: ITokensService,
	) {}

	async makeTokens(user: UserEntity): Promise<object> {
		if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET)
			throw new Error("Erro in the JwtTOkens [it dosen't the secret keys]")

		// probably i will change that, ;] (PROBABLY)
		const paylod: IJwtPayload = {
			userID: user.userID,
			name: user.name,
			email: user.email,
			age: user.age,
			admin: user.admin,
		}

		const [accessToken, refreshToken] = await Promise.all([
			this.accessTokenService.makeToken(
				paylod,
				process.env.ACCESS_TOKEN_SECRET,
			),
			this.refershTokenService.makeToken(
				paylod,
				process.env.REFRESH_TOKEN_SECRET,
			),
		])

		return { accessToken: accessToken, refreshToken: refreshToken }
	}
}
