import { Type } from "class-transformer"
import { IsNotEmpty, IsObject } from "class-validator"
import type { IRefreshTokenDto } from "src/aplication/service/auth/jwt/interface/dto/IRefreshTokenDto"
import { AuthTokensDto } from "src/aplication/service/auth/jwt/interface/dto/IAuthTokensDto"

export class DtoRefreshToken implements IRefreshTokenDto {
	@IsNotEmpty()
	@IsObject()
	@Type(() => AuthTokensDto)
	loginResult: AuthTokensDto
}
