import type { InferInsertModel, InferSelectModel } from "drizzle-orm"
import type { sessionUser } from "src/adapters/spi/drizzle/db/schema/userSessionSchema"
import type { UserSessionEntity } from "src/domains/userSession-entity"

export type DrizzleUserSelect = InferSelectModel<typeof sessionUser> // Tipo para dados selecionados
export type DrizzleUserInsert = InferInsertModel<typeof sessionUser> // Tipo para dados a serem inseridos

export class UserSessionMapper {
	static toEntity(userSession: UserSessionEntity): DrizzleUserInsert {
		return {
			userID: userSession.userID,
			accessID: userSession.accessID,
			refreshID: userSession.refreshID,
			createAt: userSession.createAt,
			revoked: userSession.revoked,
		}
	}

	static toDomain(drizzleUser: DrizzleUserSelect): UserSessionEntity {
		return {
			userID: drizzleUser.userID,
			accessID: drizzleUser.accessID,
			refreshID: drizzleUser.refreshID,
			createAt: drizzleUser.createAt,
			revoked: drizzleUser.revoked,
		}
	}
}
