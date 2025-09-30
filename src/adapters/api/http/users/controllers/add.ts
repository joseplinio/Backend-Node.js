import { StatusCodes } from "http-status-codes"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IUserValideDto } from "src/aplication/interface/dto/user/IUserValideDto"
import { CreaterUserDtoRequest } from "src/aplication/use_case/users/dto/dtoRequestUser"
import { inject, injectable } from "tsyringe"
import type { IUseCase } from "../../../../../aplication/interface/cases/IUseCase"
import type { IController } from "../../../../../aplication/interface/controllers/IController"

@injectable()
export class UserAddController implements IController<AdapterExpress> {
	constructor(
		@inject("UserAddCase")
		private userAddCase: IUseCase<CreaterUserDtoRequest, object>,
		@inject("DtoValidator")
		private dtoValidtor: IUserValideDto<CreaterUserDtoRequest, any>,
	) {}

	async handler(httpContext: AdapterExpress): Promise<void> {
		try {
			const { body } = await httpContext.getRequest()
			const userInstance =
				await this.dtoValidtor.valideDto<CreaterUserDtoRequest>(
					CreaterUserDtoRequest,
					body,
				)

			const addResult = await this.userAddCase.handler(userInstance)

			await httpContext.sendInfo<typeof addResult>(
				StatusCodes.CREATED,
				"User created with aesly.",
				addResult,
			)
		} catch (err) {
			console.log(err)

			await httpContext.sendInfo<typeof err>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Erro ao criar o user",
				err,
			)
		}
	}
}
