import Jwt, { type JwtPayload } from "jsonwebtoken"
import type { ITokensService } from "src/aplication/interface/dto/auth/IAccessTokenService"
import type { IJwtPayload } from "src/aplication/interface/dto/services/jwt/IJwtPayload"
import { injectable } from "tsyringe"

@injectable()
export class RefershTokenService implements ITokensService {
	async makeToken(
		payloadInstance: IJwtPayload,
		token: string,
	): Promise<string | JwtPayload | null> {
		const accessToken = Jwt.sign(payloadInstance, token)

		return accessToken
	}
}
