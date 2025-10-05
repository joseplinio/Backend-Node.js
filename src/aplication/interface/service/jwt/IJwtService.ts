import type { JwtPayload } from "jsonwebtoken"
import type { IJwtPayload } from "src/aplication/interface/dto/services/jwt/IJwtPayload"

export interface IJwtService {
	authToken(token: string, secret: string): Promise<IJwtPayload>
	showPayload(token: string): Promise<string | JwtPayload | object | null>
}
