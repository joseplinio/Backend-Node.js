import { Type } from "class-transformer"
import { IsNotEmpty, IsObject } from "class-validator"
import { AuthTokensDto } from "src/aplication/interface/dto/services/jwt/dto/IAuthTokensDto"
import type { IRefreshTokenDto } from "src/aplication/interface/dto/auth/IRefreshTokenDto"

export class DtoRefreshToken implements IRefreshTokenDto {
	@IsNotEmpty()
	@IsObject()
	@Type(() => AuthTokensDto)
	loginResult: AuthTokensDto
}
