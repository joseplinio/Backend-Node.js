import type { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { AdapterExpress } from "../expressAdapter"
import { UserRepository } from "src/adapters/spi/repositories/userRepository"

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const adapterEx = new AdapterExpress(req, res)
		const userRepository = new UserRepository()

		const body = (await adapterEx.getRequest()).body
		if (!body) {
			throw new Error("no boby to use")
		}

		const user = await userRepository.findById(body.id)
		if (!user) {
			throw new Error("User not found")
		}

		if (user.admin !== false) {
			await adapterEx.sendInfo(
				StatusCodes.UNAUTHORIZED,
				"You can't acess this router",
				null,
			)
		}
		
    next()
	} catch (err) {
		console.log(err)
	}
}
