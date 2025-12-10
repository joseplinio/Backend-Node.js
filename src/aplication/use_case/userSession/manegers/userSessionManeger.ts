import type { IUseCase } from "src/aplication/interface/case/IUseCase"
import type { IJwtPayload } from "src/aplication/interface/dto/services/jwt/IJwtPayload"
import type { IJwtTokens } from "src/aplication/interface/dto/services/jwt/IJwtSession"
import type { IManager } from "src/aplication/interface/manager/IManager"
import type { UserEntity } from "src/domains/user-entity"
import type { UserSessionEntity } from "src/domains/userSession-entity"
import { inject, injectable } from "tsyringe"

@injectable()
export class UserSessionManager implements IManager<UserEntity, object | void> {
	constructor(
		@inject("JwtTokens")
		private jwtTokens: IJwtTokens<object, object>,
		@inject("UserSessionAddCase")
		private userSessionAddCase: IUseCase<object, UserSessionEntity>,
		@inject("UserSessionFindCase")
		private userSessionFindCase: IUseCase<IJwtPayload, UserSessionEntity>,
		@inject("UserSessionDeleteCase")
		private userSessionDeleteCase: IUseCase<UserSessionEntity, void>,
	) {}
	async handler(user: UserEntity): Promise<object | void> {
		const existingSession = await this.userSessionFindCase.handler(user)

		if (existingSession) {
			await this.userSessionDeleteCase.handler(existingSession)
		}
		
		const newSession = await this.jwtTokens.makeTokens(user)
		await this.userSessionAddCase.handler(user)

		return newSession
	}
}
