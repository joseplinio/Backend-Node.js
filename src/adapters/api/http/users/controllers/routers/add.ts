import { randomUUID } from "crypto"
import { StatusCodes } from "http-status-codes"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IHashItem } from "src/aplication/interface/auth/hash/IHashItem"
import type { IUserValideDto } from "src/aplication/interface/dto/IUserValideDto"
import { CreateUserModel } from "src/aplication/use_case/TyCreaterUser"
import { CreaterUserDtoRequest } from "src/aplication/use_case/users/dto/dtoRequestUser"
import { inject, injectable } from "tsyringe"
import type { IController } from "../../../../../../aplication/interface/controllers/IController"
import type { IUseCase } from "../../../../../../aplication/use_case/case"
import type { UserEntity } from "../../../../../../domains/user-entity"

@injectable()
export class UserAddController implements IController<AdapterExpress> {
	constructor(
		@inject("UserAddCase")
		private userService: IUseCase<CreateUserModel, UserEntity>,
		@inject("DtoValidator")
		private dtoValidtor: IUserValideDto<CreaterUserDtoRequest, any>,
		@inject("serviceHashItem") private serviceHashPassword: IHashItem,
	) {}

	async handler(httpContext: AdapterExpress): Promise<void> {
		try {
			const { body } = await httpContext.getRequest()
			const userInstance =
				await this.dtoValidtor.valideDto<CreaterUserDtoRequest>(
					CreaterUserDtoRequest,
					body,
				)

			const hashedPasswd = await this.serviceHashPassword.hashItem(
				userInstance.hashpasswd,
			)
			const createUser: CreateUserModel = {
				...userInstance,
				id: randomUUID(),
				hashpasswd: hashedPasswd,
				role: "user",
			}
			delete userInstance.hashpasswd // to change that (stetic)

			await this.userService.handler(createUser)
			if (!createUser)
				httpContext.send<any>(
					StatusCodes.BAD_REQUEST,
					"Erro ao fazer a permanencia do user",
					null,
				)
			httpContext.send<typeof userInstance>(
				StatusCodes.CREATED,
				"User criado com sucesso",
				userInstance,
			)
		} catch (err) {
			console.log(err)

			httpContext.send<typeof err>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Erro ao criar o user",
				err,
			)
		}
	}
}
