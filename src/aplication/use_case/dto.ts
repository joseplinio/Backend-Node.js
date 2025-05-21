import { IsEmail, IsString, Length, IsStrongPassword, IsNumber} from "class-validator"
import { Transform } from "class-transformer"
import type { IDto } from "../interface/dto/IDto"

export class CreaterUserDtoRequest implements IDto {
  @IsString()
	@Length(3, 100)
	@Transform(({ value }: { value: string }) =>
		value
			.split(" ")
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
			.join(" "),
	)
	name!: string

	@IsNumber()
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
	hashpassword!: string

}