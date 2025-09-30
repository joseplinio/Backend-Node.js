import type { Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import type { JwtPayload } from "jsonwebtoken"
import type { IHttpContext } from "src/aplication/interface/http/IHttpContext"
import type { IRequest } from "src/aplication/interface/http/IRequest"
import { injectable } from "tsyringe"

@injectable()
export class AdapterExpress implements IHttpContext {
	constructor(
		private request: Request,
		private response: Response,
	) {}
	async cleanTheCookies(id: string): Promise<void> {
		throw new Error("Method not implemented.")
	}

	async getRequest(): Promise<IRequest<any>> {
		const { body, params, query, headers, cookies } = this.request

		return {
			body: body,
			params: params,
			query: query,
			cookies: cookies,
			headers: headers as any,
		}
	}

	async sendInfo<T>(
		statusCode: (typeof StatusCodes)[keyof typeof StatusCodes],
		message: string,
		data: T,
	): Promise<unknown> {
		return this.response.status(statusCode).send({ statusCode, message, data })
	}
	async sendTokenByCookies(
		name: string,
		token: JwtPayload | string,
	): Promise<unknown> {
		return this.response.cookie(name, token)
	}
}
