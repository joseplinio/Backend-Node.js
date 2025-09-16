import { StatusCodes } from "http-status-codes"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IController } from "src/aplication/interface/controllers/IController"
import type { IUserValideDto } from "src/aplication/interface/dto/IUserValideDto"
import type { IUseCase } from "src/aplication/use_case/case"
import { DtoFindUser } from "src/aplication/use_case/users/dto/dtoFindUser"

import type { UserEntity } from "src/domains/user-entity"
import { inject, injectable } from "tsyringe"

@injectable()
export class UserFindController implements IController<AdapterExpress> {
	constructor(
		@inject("UserFindCase")
		private userFindCase: IUseCase<any, UserEntity[] | null>,
		@inject("DtoValidator")
		private dtoValidator: IUserValideDto<DtoFindUser, any>,
	) {}

	async handler(httpContext: AdapterExpress): Promise<void> {
		try {
			const { query }: any = await httpContext.getRequest()
			console.log(query)

			const queryInstace = await this.dtoValidator.valideDto<DtoFindUser>(
				DtoFindUser,
				query,
			)
			let resultQuery = await this.userFindCase.handler(queryInstace)
			if (resultQuery?.length == 0) {
				resultQuery = null
			}

			httpContext.send<typeof resultQuery>(
				StatusCodes.OK,
				"Query feita com sucesso",
				resultQuery,
			)
		} catch (err: any) {
			console.log(err)

			httpContext.send<typeof err>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Erro ao tentar fazer a query",
				err,
			)
		}
	}
}
