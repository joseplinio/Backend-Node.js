import { IJwtPayload } from "src/aplication/interface/dto/services/jwt/IJwtPayload"
import type { UserEntity } from "src/domains/user-entity"
import { inject, injectable } from "tsyringe"
import type { ITokensService } from "../../../interface/dto/auth/IAccessTokenService"
import type { IJwtSession } from "../../../interface/dto/services/jwt/IJwtManeger"

@injectable()
export class JwtSession implements IJwtSession<UserEntity, object> {
	constructor(
		@inject("RefershTokenService")
		private refershTokenService: ITokensService,
		@inject("AccessTokenService")
		private accessTokenService: ITokensService,
	) {}

	async makeSession(user: UserEntity): Promise<object> {
		if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET)
			throw new Error("Erro in the JwtSession [it dosen't the secret keys]")

		const paylod: IJwtPayload = {
			id: user.id,
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
