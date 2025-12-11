import { type Request, type Response, Router } from "express"
import { UserLoginController } from "src/adapters/api/http/auth/controllers/login"
import { UserLogoutController } from "src/adapters/api/http/auth/controllers/logout"
import { RefreshTokenController } from "src/adapters/api/http/auth/controllers/refresh"
import { container } from "tsyringe"
import { AdapterExpress } from "../../expressAdapter"

export const authRouter = Router()

authRouter.post("/login", async (req: Request, res: Response) => {
	const adapterEx = new AdapterExpress(req, res)
	container.resolve(UserLoginController).handler(adapterEx)
})

authRouter.post("/logout", async (req: Request, res: Response) => {
	const adapterEx = new AdapterExpress(req, res)
	container.resolve(UserLogoutController).handler(adapterEx)
})

authRouter.post("/refresh", async (req: Request, res: Response) => {
	const adapterEx = new AdapterExpress(req, res)
	container.resolve(RefreshTokenController).handler(adapterEx)
})
