import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import type { IValideDto } from "../interface/dto/IValideDto"

export class DtoValidator implements IValideDto<any, unknown> {
	async valideDto<T>(dtoClass: new () => T, data: any): Promise<T> {
		try {
			// he need the real class no a instace !
			const instance = plainToInstance(dtoClass as any, data)
			const errors = await validate(instance)

			if (errors.length > 0) {
				for (const error of errors) {
					if (error.constraints) {
						console.log(`Erro na validaçao:\n${error.constraints}`)
					}
				}

				console.log(JSON.stringify(errors))
				throw new Error("Dados invalidos recibidos!")
			}

			return instance as T // Me parece meio Leao e Nilce !, mas vou deixar na duvida
		} catch (err) {
			throw new Error(String(err))
		}
	}
}
