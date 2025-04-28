import { Transform } from "class-transformer"
import { IsNumber, IsString, IsStrongPassword, Length } from "class-validator"

export class CreateUserRequestDTO {
	@IsString()
	@Length(3, 100)
	@Transform(({ value }: { value: string }) =>
		value
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(" "),
	)
	name: string

	@IsNumber()
	age: number

	@IsStrongPassword({
		minLength: 12,
		minLowercase: 4,
		minNumbers: 2,
		minSymbols: 2,
		minUppercase: 3,
	})
	hashPassWord: string

	constructor(name: string, age: number, hashPassWord: string) {
		this.name = name
		this.age = age
		this.hashPassWord = hashPassWord
	}
}
