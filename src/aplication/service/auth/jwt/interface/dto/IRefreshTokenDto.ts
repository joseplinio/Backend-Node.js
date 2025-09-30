import { AuthTokensDto } from "src/aplication/service/auth/jwt/interface/dto/IAuthTokensDto"

export interface IRefreshTokenDto {
	loginResult: AuthTokensDto
}
