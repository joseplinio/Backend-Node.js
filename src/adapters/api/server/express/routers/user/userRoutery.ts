import { type Request, type Response, Router } from "express"
import { UserDeleteController } from "src/adapters/api/http/users/controllers/delete"
import { UserFindController } from "src/adapters/api/http/users/controllers/find"
import { UserListController } from "src/adapters/api/http/users/controllers/list"
import { container } from "tsyringe"
import { UserAddController } from "../../../../http/users/controllers/add"
import { AdapterExpress } from "../../expressAdapter"

export const userRouter = Router()

userRouter.post("/", async (req: Request, res: Response) => {
	const adapterEx = new AdapterExpress(req, res)
	container.resolve(UserAddController).handler(adapterEx)
})

userRouter.get("/", async (req: Request, res: Response) => {
	const adapterEx = new AdapterExpress(req, res)
	container.resolve(UserListController).handler(adapterEx)
})

userRouter.get("/find", async (req: Request, res: Response) => {
	const adapterEx = new AdapterExpress(req, res)
	container.resolve(UserFindController).handler(adapterEx)
})

userRouter.delete("/:id", async (req: Request, res: Response) => {
	const adapterEx = new AdapterExpress(req, res)
	container.resolve(UserDeleteController).handler(adapterEx)
})
