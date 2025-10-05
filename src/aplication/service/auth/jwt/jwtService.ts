import jwt, { type JwtPayload } from "jsonwebtoken"
import type { IJwtService } from "src/aplication/interface/service/jwt/IJwtService"
import { injectable } from "tsyringe"
import type { IJwtPayload } from "../../../interface/dto/services/jwt/IJwtPayload"

@injectable()
export class JwtService implements IJwtService {
	async authToken(token: string, key: string): Promise<IJwtPayload> {
		try {
			const isValid = jwt.verify(token, key) as JwtPayload

			return isValid as IJwtPayload
		} catch (err) {
			console.log(err)
			throw new Error("Internal erro in the authToken (JwtService)")
		}
	}
	async showPayload(token: string): Promise<string | JwtPayload | null> {
		try {
			const payload = jwt.decode(token)

			return payload
		} catch (err) {
			console.log(err)
			throw new Error("Internal erro in the showPayload (JwtService)")
		}
	}
}
