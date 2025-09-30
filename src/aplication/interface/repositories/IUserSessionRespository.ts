import type { UserSessionEntity } from "src/domains/userSession-entity"

export interface IUserSessionRepository {
	add(userSession: UserSessionEntity): Promise<void>
	findByID(id: string): Promise<UserSessionEntity | null>
	isRevokedToken(
		sessionID: string,
		optionsOfTokens: "refresh" | "access",
	): Promise<boolean | null>
	deleteByID(sessionID: string): Promise<void>
}
