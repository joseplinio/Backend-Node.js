import Jwt, { type JwtPayload } from "jsonwebtoken"
import { injectable } from "tsyringe"
import type { ITokensService } from "../../interface/dto/auth/IAccessTokenService"
import type { IJwtPayload } from "../../interface/dto/services/jwt/IJwtPayload"

@injectable()
export class accessTokenService implements ITokensService {
	async makeToken(
		payloadInstance: IJwtPayload,
		token: string,
	): Promise<string | JwtPayload | null> {
		const acccessToken = Jwt.sign(payloadInstance, token, { expiresIn: "10m" })

		return acccessToken
	}
}
