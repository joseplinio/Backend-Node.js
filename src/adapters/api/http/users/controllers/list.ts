import { StatusCodes } from "http-status-codes"
import type { IController } from "src/aplication/interface/controllers/IController"
import type { IUseCase } from "src/aplication/use_case/case"
import type { UserEntity } from "src/domains/user-entity"
import { inject, injectable } from "tsyringe"
import type { AdapterExpress } from "../../../server/express/expressAdapter"

@injectable()
export class UserListerController implements IController<AdapterExpress> {
	constructor(
		@inject("UserListCase")
		private UserListCase: IUseCase<any, UserEntity | null>,
	) {}

	async handler(httpContext: AdapterExpress): Promise<void> {
		try {
			const usersResult = await this.UserListCase.handler(
				(await httpContext.getRequest()).params,
			) // Parte a ser melhorada

			httpContext.send<any>(
				StatusCodes.OK,
				"Listagem de usuario feito com sucesso!",
				usersResult,
			)
		} catch (err) {
			httpContext.send<any>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Erro ao listar os usoarios.",
				err,
			)
		}
	}
}
