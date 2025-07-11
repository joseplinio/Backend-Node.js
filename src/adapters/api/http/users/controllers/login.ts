import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IController } from "../../../../../aplication/interface/controllers/IController"
import { StatusCodes } from "http-status-codes"
import { inject, injectable } from "tsyringe"
import type { IUseCase } from "src/aplication/use_case/case"
import type { UserEntity } from "src/domains/user-entity"
import type { IDtoLoginUser } from "src/aplication/interface/dto/ILoginUserDto"
import type { IUserValideDto } from "src/aplication/interface/dto/IUserValideDto"
import { DtoLoginUser } from "src/aplication/use_case/users/dto/dtoLoginUser"

@injectable()
export class UserLoginController implements IController<AdapterExpress> {
	constructor(
		@inject("UserLoginCase")
		private userLoginCase: IUseCase<IDtoLoginUser, UserEntity | null>,
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

			const resultLogin = await this.userLoginCase.handler(bodyInstance)

			httpContext.send<any>(StatusCodes.OK, "Usuario Encontrado", {...resultLogin, hashpasswd: null})
		} catch (err) {
			console.log(err)
			httpContext.send<any>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Erro ao tentar encontrar o user!",
				err,
			)
		}
	}
}
