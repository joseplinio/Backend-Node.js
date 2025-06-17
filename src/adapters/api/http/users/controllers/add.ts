import { randomUUID } from "crypto"
import { StatusCodes } from "http-status-codes"
import type { AdapterExpress } from "src/adapters/api/server/express/expressAdapter"
import type { IUserValideDto } from "src/aplication/interface/dto/IUserValideDto"
import type { IHashPassword } from "src/aplication/service/password/IHashPassword"
import { CreateUserModel } from "src/aplication/use_case/TyCreaterUser"
import type { CreaterUserDtoRequest } from "src/aplication/use_case/dto/dto"
import { inject, injectable } from "tsyringe"
import type { IController } from "../../../../../aplication/interface/controllers/IController"
import type { IUseCase } from "../../../../../aplication/use_case/case"
import type { UserEntity } from "../../../../../domains/user-entity"
@injectable()
export class UserAddController implements IController<AdapterExpress> {
	constructor(
		@inject("UserAddCase")
		private userService: IUseCase<CreateUserModel, UserEntity>,
		@inject("dtoValidator")
		private dtoValidtor: IUserValideDto<CreaterUserDtoRequest, any>,
		@inject("serviceHashPassword") private serviceHashPassword: IHashPassword,
	) {}

	async handler(httpContext: AdapterExpress): Promise<void> {
		try {
			const request = await httpContext.getRequest()
			const userInstance = await this.dtoValidtor.valideDto(request)

			const hashedPasswd = await this.serviceHashPassword.hashPassword(
				userInstance.hashpasswd,
			)
			const createUser: CreateUserModel = {
				...userInstance,
				id: randomUUID(),
				hashpasswd: hashedPasswd,
			}
			this.userService.handler(createUser)
			if (!createUser)
				httpContext.send<any>(
					StatusCodes.BAD_REQUEST,
					"Erro ao fazer a permanencia do user",
					null,
				)

			httpContext.send<any>(StatusCodes.CREATED, "User criado com sucesso", {
				...userInstance,
				hashpasswd: null,
			})
		} catch (err) {
			httpContext.send<any>(
				StatusCodes.INTERNAL_SERVER_ERROR,
				"Erro ao criar o user",
				err,
			)
		}
	}
}
