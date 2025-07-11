import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"
import type { IDtoLoginUser } from "src/aplication/interface/dto/ILoginUserDto"

export class DtoLoginUser implements IDtoLoginUser {
	@IsString()
	@IsNotEmpty()
	@IsEmail()
	@Transform(({ value }: { value: string }) => value?.trim().toLowerCase())
	email!: string

	@IsNotEmpty()
	@IsString()
	@Transform(({ value }: { value: string }) => value?.trim())
	passwd!: string
}
