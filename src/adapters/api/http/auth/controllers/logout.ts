import { StatusCodes } from "http-status-codes"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IUseCase } from "src/aplication/interface/case/IUseCase"
import type { IValideDto } from "src/aplication/interface/dto/IValideDto"
import { DtoRefreshToken } from "src/aplication/interface/dto/services/jwt/dto/dtoRefreshToken"
import { inject, injectable } from "tsyringe"
import type { IController } from "../../../../../aplication/interface/controller/IController"

@injectable()
export class UserLogoutController implements IController<AdapterExpress> {
	constructor(
		@inject("UserLogoutCase")
		private userLogoutCase: IUseCase<DtoRefreshToken, void>,
		@inject("DtoValidator")
		private dtoValidtor: IValideDto<DtoRefreshToken, any>,
	) {}

	async handler(httpContext: AdapterExpress): Promise<void> {
		try {
			const cookies = (await httpContext.getRequest()).cookies
			const requestInstance = await this.dtoValidtor.valideDto(
				DtoRefreshToken,
				cookies,
			)

			await this.userLogoutCase.handler(requestInstance)
			await httpContext.clearCookies("loginResult")

			await httpContext.sendInfo<null>(
				StatusCodes.NO_CONTENT,
				"logout -> sucess!",
				null,
			)
		} catch (err) {
			console.log(err)
			await httpContext.sendInfo<typeof err>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Erro ao tentar encontrar o user!",
				err,
			)
		}
	}
}
