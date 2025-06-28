import { Transform } from "class-transformer"
import { IsEmail, IsOptional, IsString, IsUUID, Length } from "class-validator"
import type { IDtoFindUser } from "src/aplication/interface/dto/IFindUserDto"

export class DtoFindUser implements IDtoFindUser {
	@IsOptional()
	@IsString()
	@IsUUID(4)
	id?: string

	@IsOptional()
	@Transform(({ value }: { value: string }) =>
		value
			.trim()
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(" "),
	)
	@IsString()
	@Length(3, 100)
	name?: string

	@IsOptional()
	@Transform(({ value }) => value.toLowerCase().trim())
	@IsString()
	@IsEmail()
	email?: string
}
