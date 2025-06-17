import { StatusCodes } from "http-status-codes"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IController } from "src/aplication/interface/controllers/IController"
import type { IUseCase } from "src/aplication/use_case/case"
import { inject, injectable } from "tsyringe"

@injectable()
export class UserDeleteController implements IController<AdapterExpress> {
	constructor(
		@inject("UserDeleteCase") private UserDeleteCase: IUseCase<any, void>,
	) {}

	async handler(httpContext: AdapterExpress): Promise<void> {
		try {
			const { params } = await httpContext.getRequest()

			this.UserDeleteCase.handler(params.id) // Mecher aqui !!
			httpContext.send<any>(StatusCodes.OK, "User deletado com sucesso!", null)
		} catch (err) {
			httpContext.send<any>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Não foi possivel deletar o user.",
				err,
			)
		}
	}
}
