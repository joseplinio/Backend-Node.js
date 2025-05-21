import { inject, injectable } from "tsyringe"
import type { IController } from "../../../../../aplication/interface/controllers/IController"
import type { IUseCase } from "../../../../../aplication/use_case/case"
import { UserAddCase } from "../../../../../aplication/use_case/users/add"
import type { UserEntity } from "../../../../../domains/user-entity"

@injectable()
export class UserAddController implements IController<UserEntity, UserEntity> {
	constructor(
		@inject(UserAddCase) private userSercice: IUseCase<UserEntity, UserEntity>,
	) {}

	handler(body: UserEntity): Promise<UserEntity> {
		return this.userSercice.handler(body)
	}
}
