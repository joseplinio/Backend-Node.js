import type { IUseCase } from "src/aplication/interface/case/IUseCase"
import type { IJwtPayload } from "src/aplication/interface/dto/services/jwt/IJwtPayload"
import type { IUserSessionRepository } from "src/aplication/interface/repositories/IUserSessionRepository"
import type { UserEntity } from "src/domains/user-entity"
import type { UserSessionEntity } from "src/domains/userSession-entity"
import { inject, injectable } from "tsyringe"

@injectable()
export class UserSessionFindCase
	implements IUseCase<UserEntity | IJwtPayload, UserSessionEntity | null>
{
	constructor(
		@inject("UserSessionRepository")
		private userSessionRepository: IUserSessionRepository,
	) {}
	async handler(
		body: UserEntity | IJwtPayload,
	): Promise<UserSessionEntity | null> {
		const findResult = await this.userSessionRepository.findByID(body.userID)

		return findResult
	}
}
