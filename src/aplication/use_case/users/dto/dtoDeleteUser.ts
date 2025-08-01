import { IsNotEmpty, IsString, IsUUID } from "class-validator"
import type { IDtoDeleteUser } from "src/aplication/interface/dto/IDeleteUserDto"

export class DtoDeleteUser implements IDtoDeleteUser {
	@IsNotEmpty()
	@IsString()
	@IsUUID(4)
	id: string
}
