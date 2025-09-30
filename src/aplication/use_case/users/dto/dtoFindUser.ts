import { Transform } from "class-transformer"
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	IsUUID,
	Length,
} from "class-validator"
import type { IDtoFindUser } from "src/aplication/interface/dto/admin/IFindUserDto"

export class DtoFindUser implements IDtoFindUser {
	@IsNotEmpty()
	@IsOptional()
	@IsString()
	@IsUUID(4)
	id?: string

	@IsNotEmpty()
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

	@IsNotEmpty()
	@IsOptional()
	@Transform(({ value }) => value.toLowerCase().trim())
	@IsString()
	@IsEmail()
	email?: string
}
