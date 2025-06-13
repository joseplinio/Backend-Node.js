import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import type { IRequest } from "src/aplication/interface/http/IRequest"
import type { IUserValideDto } from "../../interface/dto/IUserValideDto"
import { CreaterUserDtoRequest } from "./dto"

export class dtoValidator
	implements IUserValideDto<CreaterUserDtoRequest, IRequest<any>>
{
	async valideDto(request: IRequest<any>): Promise<CreaterUserDtoRequest> {
		try {
			const { body: user } = request
			const instance = plainToInstance(CreaterUserDtoRequest, user)

			const errors = await validate(instance)

			if (errors.length > 0) {
				for (const error of errors) {
					if (error.constraints) {
						console.log(error.constraints)
					}
				}

				console.log(JSON.stringify(errors))
				throw new Error()
			}

			return instance
		} catch (err) {
			throw new Error(String(err))
		}
	}
}
