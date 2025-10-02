import { eq } from "drizzle-orm"
import type { IUserSessionRepository } from "src/aplication/interface/repositories/IUserSessionRespository"
import { UserSessionMapper } from "src/aplication/mapper/userSession/userSessionMapper"
import type { UserSessionEntity } from "src/domains/userSession-entity"
import { db } from "../drizzle/db/db"
import { sessionUser } from "../drizzle/db/schema/userSessionSchema"

export class UserSessionRepository implements IUserSessionRepository {
	async add(userSession: UserSessionEntity): Promise<void> {
		const values = UserSessionMapper.toEntity(userSession)

		await db.insert(sessionUser).values(values)
	}
	async findByID(id: string): Promise<UserSessionEntity | null> {
		try {
			const filterFindById = eq(sessionUser.userID, id)

			const idResult = await db.query.sessionUser.findFirst({
				where: filterFindById,
			})

			if (!idResult)
				throw new Error("Erro in the findByID [it donsn't the idResult]")

			return UserSessionMapper.toDomain(idResult)
		} catch (err) {
			console.log(err)
			return null
		}
	}
	async isRevokedToken(
		sessionID: string,
		optionsOfTokens: "refresh" | "access",
	): Promise<boolean | null> {
		try {
			const filterForRevokedToken =
				optionsOfTokens === "access"
					? eq(sessionUser.accessID, sessionID)
					: eq(sessionUser.refreshID, sessionID)

			const revokedTokenResult = await db.query.sessionUser.findFirst({
				where: filterForRevokedToken,
			})
			if (revokedTokenResult == undefined) return true

			return false
		} catch (err) {
			console.log(err)
			return null
		}
	}
	async invalidByID(sessionID: string): Promise<void> {
		try {
			await db.delete(sessionUser).where(eq(sessionUser.userID, sessionID))
		} catch (err) {
			console.log(err)
		}
	}
}
