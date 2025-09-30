import type { JwtPayload } from "jsonwebtoken"
import type { IJwtPayload } from "src/aplication/service/auth/jwt/interface/IJwtPayload"

export interface IJwtService {
	authToken(token: string, secret: string): Promise<IJwtPayload>
	showPayload(token: string): Promise<string | JwtPayload | object | null>
}
