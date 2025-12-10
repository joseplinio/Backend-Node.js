import type { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import { AdapterExpress } from "../expressAdapter"

export const roleMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const adapterEx = new AdapterExpress(req, res)

    const cookies = (await adapterEx.getRequest()).cookies
    console.log(cookies)

    if (!cookies)
      await adapterEx.sendInfo<null>(
        StatusCodes.UNAUTHORIZED,
        "You dont have the cookies or tokens",
        null,
      )

    next()
  } catch (err) {
    console.log(err)
  }
}
