import { IsNotEmpty, IsString, IsUUID } from "class-validator"
import { IDtoDeleteUser } from "src/aplication/interface/dto/admin/IDeleteUserDto"

export class DtoDeleteUser implements IDtoDeleteUser {
	@IsNotEmpty()
	@IsString()
	@IsUUID(4)
	id: string
}
