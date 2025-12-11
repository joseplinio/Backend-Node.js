import type { IUseCase } from "src/aplication/interface/case/IUseCase"
import type { IUserSessionRepository } from "src/aplication/interface/repositories/IUserSessionRepository"
import type { UserSessionEntity } from "src/domains/userSession-entity"
import { inject, injectable } from "tsyringe"

@injectable()
export class USerSessionDeleteCase
	implements IUseCase<UserSessionEntity, void>
{
	constructor(
		@inject("UserSessionRepository")
		private userSessionRepository: IUserSessionRepository,
	) {}

	async handler(userSession: UserSessionEntity): Promise<void> {
		await this.userSessionRepository.invalidByID(userSession.userID)
	}
}
