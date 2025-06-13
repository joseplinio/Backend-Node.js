import type { Response, Request } from "express"
import { StatusCodes } from "http-status-codes"
import type { IHttpContext } from "src/aplication/interface/http/IHttpContext"
import type { IRequest } from "src/aplication/interface/http/IRequest"
import { injectable } from "tsyringe"

@injectable()
export class AdapterExpress implements IHttpContext {
	constructor(
		private request: Request,
		private response: Response,
	) {}
	
	async getRequest(): Promise<IRequest<any>> {
		const {body, params, query } = this.request 
		
		return {
			body: body,
			params: params,
			query: query
		}
	}

	async send<T>(
		statusCode: (typeof StatusCodes)[keyof typeof StatusCodes],
		message: string,
		data: T,
	): Promise<unknown> {
		return this.response.status(statusCode).send({ statusCode, message, data })
	}
}
