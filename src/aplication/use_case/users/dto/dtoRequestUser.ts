import { Transform } from "class-transformer"
import {
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsString,
	IsStrongPassword,
	Length,
	Max,
	Min,
} from "class-validator"
import type { IRequestUserDto } from "../../../interface/dto/IRequestUserDto"

export class CreaterUserDtoRequest implements IRequestUserDto {
	@IsNotEmpty()
	@IsString()
	@Length(3, 100)
	@Transform(({ value }: { value: string }) =>
		value
			.trim()
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(" "),
	)
	name!: string

	@IsNotEmpty()
	@IsNumber()
	@Min(15)
	@Max(120)
	age!: number

	@IsNotEmpty()
	@Transform(({ value }) => value?.toLowerCase().trim())
	@IsEmail()
	email!: string

	@IsNotEmpty()
	@IsStrongPassword(
		{
			minLength: 12,
			minLowercase: 4,
			minNumbers: 2,
			minSymbols: 3,
			minUppercase: 3,
		},
		{
			message:
				"A senha deve ter no mínimo 12 caracteres, incluindo pelo menos 4 letras minúsculas, 3 letras maiúsculas, 2 números e 3 símbolos especiais.",
		},
	)
	hashpasswd!: string
}
