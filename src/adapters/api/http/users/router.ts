import { container, inject } from "tsyringe"
import type { IController } from "../../../../aplication/interface/controllers/IController"
import type { IRouter } from "../../../../aplication/interface/controllers/IRouter"
import type { UserEntity } from "../../../../domains/user-entity"
import { UserAddController } from "./controllers/add"

export class UserRouter implements IRouter<UserEntity, UserEntity> {
	routers: Record<string, IController<any, any>>

	constructor(@inject(UserAddController) userAddController: UserAddController) {
		this.routers = {
			add: userAddController,
		}
	}

	async execRoute(route: string, body: UserEntity): Promise<UserEntity | null> {
		if (await this.routers[route].handler(body)) {
			return this.routers[route].handler(body)
		}

		return null
	}
}

const userAddController = container.resolve(UserAddController)

const userRouters = new UserRouter(userAddController)
