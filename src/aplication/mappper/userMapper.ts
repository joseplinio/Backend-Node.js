import type { InferInsertModel, InferSelectModel } from "drizzle-orm"
import type { usersTable } from "src/adapters/spi/drizzle/db/schema/userSchema"
import type { UserEntity } from "src/domains/user-entity"

export type DrizzleUserSelect = InferSelectModel<typeof usersTable> // Tipo para dados selecionados
export type DrizzleUserInsert = InferInsertModel<typeof usersTable> // Tipo para dados a serem inseridos

export class UserMapper {
	static toEntity(user: UserEntity): DrizzleUserInsert {
		return {
			id: user.id,
			name: user.name,
			age: user.age,
			hashpasswd: user.hashpasswd,
			email: user.email,
			admin: user.admin,
		}
	}

	static toDomain(drizzleUser: DrizzleUserSelect): UserEntity {
		return {
			id: drizzleUser.id,
			name: drizzleUser.name,
			age: drizzleUser.age,
			hashpasswd: drizzleUser.hashpasswd,
			email: drizzleUser.email,
			admin: drizzleUser.admin,
		}
	}
}
