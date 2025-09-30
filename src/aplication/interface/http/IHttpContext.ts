import { StatusCodes } from "http-status-codes"
import type { IRequest } from "./IRequest"

// re acolocar depois
export type HttpResponse<T = any> = {
	statusCode: StatusCodes
	message: string
	data: T
}

export interface IHttpContext {
	// Serve para mostra que cada estatus tem (key: valeu) = httpStatus !!
	getRequest(): Promise<IRequest<any>>

	sendInfo<T>(
		statusCode: (typeof StatusCodes)[keyof typeof StatusCodes],
		message: string,
		data: T,
	): Promise<unknown>

	sendTokenByCookies(name: string, cookies: string): Promise<unknown>

	cleanTheCookies(id: string): Promise<void>
}
