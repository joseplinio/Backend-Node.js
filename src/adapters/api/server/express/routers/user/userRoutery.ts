import { type Request, type Response, Router } from "express"
import { container } from "tsyringe"
import { UserAddController } from "../../../../http/users/controllers/add"
import { UserListerController } from "../../../../http/users/controllers/list"
import { AdapterExpress } from "../../expressAdapter"

export const userRouter = Router()

userRouter.post("/", async (req: Request, res: Response) => {
	const adapterEx = new AdapterExpress(req, res)
	container.resolve(UserAddController).handler(adapterEx)
})

userRouter.get("/", async (req: Request, res: Response) => {
	const adapterEx = new AdapterExpress(req, res)
	container.resolve(UserListerController).handler(res, adapterEx)
})
