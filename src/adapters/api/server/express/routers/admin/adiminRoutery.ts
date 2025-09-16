import { type Request, type Response, Router } from "express"
import { UserDeleteController } from "src/adapters/api/http/users/controllers/routers/delete"
import { UserFindController } from "src/adapters/api/http/users/controllers/routers/find"
import { UserListController } from "src/adapters/api/http/users/controllers/routers/list"
import { container } from "tsyringe"
import { AdapterExpress } from "../../expressAdapter"

export const adminRouter = Router()

adminRouter.get("/list", async (req: Request, res: Response) => {
	const adapterEx = new AdapterExpress(req, res)
	container.resolve(UserListController).handler(adapterEx)
})

adminRouter.get("/find", async (req: Request, res: Response) => {
	const adapterEx = new AdapterExpress(req, res)
	container.resolve(UserFindController).handler(adapterEx)
})

adminRouter.delete("/:id", async (req: Request, res: Response) => {
	const adapterEx = new AdapterExpress(req, res)
	container.resolve(UserDeleteController).handler(adapterEx)
})
