import { StatusCodes } from "http-status-codes"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IDtoLoginUser } from "src/aplication/interface/dto/ILoginUserDto"
import type { IUserValideDto } from "src/aplication/interface/dto/IUserValideDto"
import type { IUseCase } from "src/aplication/use_case/case"
import { DtoLoginUser } from "src/aplication/use_case/users/dto/dtoLoginUser"
import type { UserEntity } from "src/domains/user-entity"
import { inject, injectable } from "tsyringe"
import type { IController } from "../../../../../../aplication/interface/controllers/IController"

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

			httpContext.send<typeof resultLogin>(
				StatusCodes.OK,
				"Usuario Encontrado",
				resultLogin,
			)
	
		} catch (err) {
			console.log(err)
			httpContext.send<typeof err>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Erro ao tentar encontrar o user!",
				err,
			)
		}
	}
}
