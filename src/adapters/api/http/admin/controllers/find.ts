import { StatusCodes } from "http-status-codes"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IUseCase } from "src/aplication/interface/case/IUseCase"
import type { IController } from "src/aplication/interface/controller/IController"
import type { IValideDto } from "src/aplication/interface/dto/IValideDto"
import { DtoFindUser } from "src/aplication/use_case/users/dto/dtoFindUser"
import { inject, injectable } from "tsyringe"

@injectable()
export class UserFindController implements IController<AdapterExpress> {
	constructor(
		@inject("UserFindCase")
		private userFindCase: IUseCase<DtoFindUser, object[] | null>,
		@inject("DtoValidator")
		private dtoValidator: IValideDto<DtoFindUser, any>,
	) {}

	async handler(httpContext: AdapterExpress): Promise<void> {
		try {
			const { query } = await httpContext.getRequest()

			const queryInstace = await this.dtoValidator.valideDto<DtoFindUser>(
				DtoFindUser,
				query,
			)
			let queryResult = await this.userFindCase.handler(queryInstace)

			await httpContext.sendInfo<typeof queryResult>(
				StatusCodes.OK,
				"Query feita com sucesso",
				queryResult,
			)
		} catch (err: any) {
			console.log(err)

			await httpContext.sendInfo<typeof err>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Erro ao tentar fazer a query",
				err,
			)
		}
	}
}
