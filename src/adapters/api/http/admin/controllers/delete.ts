import { StatusCodes } from "http-status-codes"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IUseCase } from "src/aplication/interface/case/IUseCase"
import type { IController } from "src/aplication/interface/controller/IController"
import type { IValideDto } from "src/aplication/interface/dto/IValideDto"
import { DtoDeleteUser } from "src/aplication/use_case/users/dto/dtoDeleteUser"
import { inject, injectable } from "tsyringe"

@injectable()
export class UserDeleteController implements IController<AdapterExpress> {
	constructor(
		@inject("UserDeleteCase")
		private userDeleteCase: IUseCase<string, void>,
		@inject("DtoValidator")
		private dtoValidator: IValideDto<DtoDeleteUser, any>,
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
				await httpContext.sendInfo<any>(
					StatusCodes.BAD_REQUEST,
					"Erro ao deletar o user",
					null,
				)
			}

			await httpContext.sendInfo<null>(
				StatusCodes.NO_CONTENT,
				"User deletado com sucesso!",
				null,
			)
		} catch (err) {
			console.log(err)

			await httpContext.sendInfo<typeof err>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Não foi possivel deletar o user.",
				err,
			)
		}
	}
}
