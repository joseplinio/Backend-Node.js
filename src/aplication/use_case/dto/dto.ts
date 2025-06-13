import { Transform } from "class-transformer"
import {
	IsEmail,
	IsNumber,
	IsString,
	IsStrongPassword,
	Length,
	Max,
	Min,
} from "class-validator"
import type { IDto } from "../../interface/dto/IDto"

export class CreaterUserDtoRequest implements IDto {
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

	@IsNumber()
	@Min(15)
	@Max(120)
	age!: number

	@IsEmail()
	email!: string

	@IsStrongPassword({
		minLength: 12,
		minLowercase: 4,
		minNumbers: 2,
		minSymbols: 3,
		minUppercase: 3,
	})
	hashpasswd!: string
}
