import type { JwtPayload } from "jsonwebtoken"
import type { IJwtPayload } from "../services/jwt/IJwtPayload"

export interface ITokensService {
	makeToken(
		payloadInstance: IJwtPayload,
		token: string,
	): Promise<string | JwtPayload | null>
}
