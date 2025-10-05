import { StatusCodes } from "http-status-codes"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IUseCase } from "src/aplication/interface/case/IUseCase"
import type { IController } from "src/aplication/interface/controller/IController"
import type { IValideDto } from "src/aplication/interface/dto/IValideDto"
import type { IRequest } from "src/aplication/interface/http/IRequest"
import { DtoListUser } from "src/aplication/use_case/users/dto/dtoListUser"
import { inject, injectable } from "tsyringe"

@injectable()
export class UserListController implements IController<AdapterExpress> {
	constructor(
		@inject("UserListCase")
		private userListcase: IUseCase<DtoListUser, object[]>,
		@inject("DtoValidator")
		private dtoValidator: IValideDto<DtoListUser, IRequest<any>>,
	) {}

	async handler(httpContext: AdapterExpress): Promise<void> {
		try {
			const request = await httpContext.getRequest()

			const listAllInstance = await this.dtoValidator.valideDto<DtoListUser>(
				DtoListUser,
				request,
			)
			const listResult = await this.userListcase.handler(listAllInstance)

			await httpContext.sendInfo<typeof listResult>(
				StatusCodes.OK,
				"Listagem feita com sucesso!",
				listResult,
			)
		} catch (err) {
			console.log(err)

			await httpContext.sendInfo<typeof err>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Erro ao tentar fazer a listagem dos usuarios",
				err,
			)
		}
	}
}
