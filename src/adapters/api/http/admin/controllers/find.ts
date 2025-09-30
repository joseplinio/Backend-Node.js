import { StatusCodes } from "http-status-codes"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IController } from "src/aplication/interface/controllers/IController"
import type { IUserValideDto } from "src/aplication/interface/dto/user/IUserValideDto"
import type { IUseCase } from "src/aplication/interface/cases/IUseCase"
import { DtoFindUser } from "src/aplication/use_case/users/dto/dtoFindUser"

import type { UserEntity } from "src/domains/user-entity"
import { inject, injectable } from "tsyringe"

@injectable()
export class UserFindController implements IController<AdapterExpress> {
	constructor(
		@inject("UserFindCase")
		private userFindCase: IUseCase<DtoFindUser, UserEntity[] | null>,
		@inject("DtoValidator")
		private dtoValidator: IUserValideDto<DtoFindUser, any>,
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
