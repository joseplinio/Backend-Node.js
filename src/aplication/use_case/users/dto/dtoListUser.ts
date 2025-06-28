import { ValidateIf } from "class-validator"

export class DtoListUser implements DtoListUser {
	@ValidateIf(() => false)
	_!: never
}
