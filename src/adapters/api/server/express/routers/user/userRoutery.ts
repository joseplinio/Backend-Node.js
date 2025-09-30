import { type Request, type Response, Router } from "express"
import { UserAddController } from "src/adapters/api/http/users/controllers/add"
import { container } from "tsyringe"
import { AdapterExpress } from "../../expressAdapter"

export const userRouter = Router()

userRouter.post("/add", async (req: Request, res: Response) => {
	const adapterEx = new AdapterExpress(req, res)
	container.resolve(UserAddController).handler(adapterEx)
})
