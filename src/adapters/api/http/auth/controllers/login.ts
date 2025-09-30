import { StatusCodes } from "http-status-codes"
import type { JwtPayload } from "jsonwebtoken"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IUseCase } from "src/aplication/interface/cases/IUseCase"
import { IDtoLoginUser } from "src/aplication/interface/dto/auth/ILoginUserDto"
import { IUserValideDto } from "src/aplication/interface/dto/user/IUserValideDto"
import { DtoLoginUser } from "src/aplication/use_case/users/dto/dtoLoginUser"
import { inject, injectable } from "tsyringe"
import type { IController } from "../../../../../aplication/interface/controllers/IController"

@injectable()
export class UserLoginController implements IController<AdapterExpress> {
	constructor(
		@inject("UserLoginCase")
		private userLoginCase: IUseCase<IDtoLoginUser, string | JwtPayload>,
		@inject("DtoValidator")
		private dtoValidator: IUserValideDto<DtoLoginUser, any>,
	) {}

	async handler(httpContext: AdapterExpress): Promise<void> {
		try {
			const { body } = await httpContext.getRequest()
			const bodyInstance = await this.dtoValidator.valideDto<DtoLoginUser>(
				DtoLoginUser,
				body,
			)

			const loginResult = await this.userLoginCase.handler(bodyInstance)

			await httpContext.sendTokenByCookies("loginResult", loginResult)
			await httpContext.sendInfo<null>(
				StatusCodes.OK,
				"login it'was doing with sucess!",
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
