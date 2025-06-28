import { StatusCodes } from "http-status-codes"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IController } from "src/aplication/interface/controllers/IController"
import type { IUserValideDto } from "src/aplication/interface/dto/IUserValideDto"
import type { IUseCase } from "src/aplication/use_case/case"
import { DtoFindUser } from "src/aplication/use_case/users/dto/dtoFindUser"
import { DtoListUser } from "src/aplication/use_case/users/dto/dtoListUser"
import type { UserEntity } from "src/domains/user-entity"
import { inject, injectable } from "tsyringe"

@injectable()
export class UserListController implements IController<AdapterExpress> {
	constructor(
		@inject("UserListCase") private userListcase: IUseCase<any, UserEntity[]>,
		@inject("DtoValidator")
		private dtoValidator: IUserValideDto<DtoFindUser, any>,
	) {}

	async handler(httpContext: AdapterExpress): Promise<void> {
		try {
			const req = await httpContext.getRequest()

			// Mecher na parte do dto
			const listAllInstance = await this.dtoValidator.valideDto<DtoListUser>(
				DtoListUser,
				req,
			)
			const resultList = await this.userListcase.handler(listAllInstance)

			httpContext.send<any>(
				StatusCodes.OK,
				"Listagem feita com sucesso!",
				resultList,
			)
		} catch (err) {
			console.log(err)

			httpContext.send<any>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Erro ao tentar fazer a listagem dos usuarios",
				err,
			)
		}
	}
}
