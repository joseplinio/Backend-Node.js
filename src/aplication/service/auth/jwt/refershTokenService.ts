import Jwt, { type JwtPayload } from "jsonwebtoken"
import { injectable } from "tsyringe"
import type { ITokensService } from "./interface/IAccessTokenService"
import type { IJwtPayload } from "./interface/IJwtPayload"

@injectable()
export class RefershTokenService implements ITokensService {
	async makeToken(
		payloadInstance: IJwtPayload,
		token: string,
	): Promise<string | JwtPayload | null> {
		const accessToken = Jwt.sign(payloadInstance, token, { expiresIn: "10m" })

		return accessToken
	}
}
