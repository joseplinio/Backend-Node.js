import { randomUUID } from "crypto"
import type { IUseCase } from "src/aplication/interface/case/IUseCase"
import type { IUserSessionRepository } from "src/aplication/interface/repositories/IUserSessionRepository"
import { UserSessionMapper } from "src/aplication/mapper/userSession/userSessionMapper"
import type { UserSessionEntity } from "src/domains/userSession-entity"
import { inject, injectable } from "tsyringe"

@injectable()
export class UserSessionAddCase implements IUseCase<UserSessionEntity, void> {
	constructor(
		@inject("UserSessionRepository")
		private userSessionRepository: IUserSessionRepository,
	) {}
	async handler(user: UserSessionEntity): Promise<void> {
		const userSession = UserSessionMapper.toEntity({
			userID: user.userID,
			accessID: randomUUID(),
			refreshID: randomUUID(),
			createAt: new Date().toString(),
			revoked: false,
		})

		await this.userSessionRepository.add(userSession)
	}
}
