import { StatusCodes } from "http-status-codes"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IUseCase } from "src/aplication/interface/cases/IUseCase"
import type { IController } from "src/aplication/interface/controllers/IController"
import type { IUserValideDto } from "src/aplication/interface/dto/user/IUserValideDto"
import { DtoRefreshToken } from "src/aplication/use_case/userSession/cases/jwt/dto/dtoRefreshToken"
import { inject, injectable } from "tsyringe"

@injectable()
export class RefreshTokenController implements IController<AdapterExpress> {
	constructor(
		@inject("RefreshTokenCase")
		private refreshTokenCase: IUseCase<DtoRefreshToken, object>,
		@inject("DtoValidator")
		private dtoValidtor: IUserValideDto<DtoRefreshToken, any>,
	) {}
	async handler(httpContext: AdapterExpress): Promise<void> {
		try {
			const cookies = (await httpContext.getRequest()).cookies
			const requestInstance = await this.dtoValidtor.valideDto(
				DtoRefreshToken,
				cookies,
			)

			await this.refreshTokenCase.handler(requestInstance)

			await httpContext.sendInfo<null>(
				StatusCodes.OK,
				"The new session maked with sucess!",
				null,
			)
		} catch (err) {
			console.log(err)
			await httpContext.sendInfo<typeof err>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Erro in the contoller",
				err,
			)
		}
	}
}
