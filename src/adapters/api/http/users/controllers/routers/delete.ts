import { StatusCodes } from "http-status-codes"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IController } from "src/aplication/interface/controllers/IController"
import type { IUserValideDto } from "src/aplication/interface/dto/IUserValideDto"
import type { IUseCase } from "src/aplication/use_case/case"
import { DtoDeleteUser } from "src/aplication/use_case/users/dto/dtoDeleteUser"
import { inject, injectable } from "tsyringe"

@injectable()
export class UserDeleteController implements IController<AdapterExpress> {
	constructor(
		@inject("UserDeleteCase") private userDeleteCase: IUseCase<any, void>,
		@inject("DtoValidator")
		private dtoValidator: IUserValideDto<DtoDeleteUser, any>,
	) {}

	async handler(httpContext: AdapterExpress): Promise<void> {
		try {
			const { params } = await httpContext.getRequest()
			const resultInstace = await this.dtoValidator.valideDto<DtoDeleteUser>(
				DtoDeleteUser,
				params,
			)
			await this.userDeleteCase.handler(resultInstace.id)

			if (!resultInstace) {
				httpContext.send<any>(
					StatusCodes.BAD_REQUEST,
					"Erro ao deletar o user",
					null,
				)
			}

			httpContext.send<null>(StatusCodes.OK, "User deletado com sucesso!", null)
		} catch (err) {
			console.log(err)

			httpContext.send<typeof err>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Não foi possivel deletar o user.",
				err,
			)
		}
	}
}
