import { and, eq } from "drizzle-orm"
import { IUserRepository } from "../../../aplication/interface/repository/IUserRepository"
import { UserEntity } from "../../../domains/user-entity"
import { db } from "../drizzle/db/db"
import { usersTable } from "../drizzle/db/schema"

export class UserRepository implements IUserRepository {
	async add(user: UserEntity): Promise<UserEntity> {
		const saved = await db
			.insert(usersTable)
			.values({
				id: user.id,
				name: user.name,
				age: user.age,
				email: user.email,
				hashpasswd: user.hashpasswd,
			})
			.returning()

		return saved[0]
	}
	async listAll(): Promise<UserEntity[] | null> {
		try {
			const listResult = await db.select().from(usersTable)

			return listResult ?? null
		} catch (err) {
			console.error(`Erro ao listar o usuarios por ${err}`)
			return null
		}
	}
	async findAny({ id, name, email }: any): Promise<UserEntity[] | null> {
		try {
			// Peguei com ajuda da IA mals ];
			const filters = [
				id ? eq(usersTable.id, id) : undefined,
				name ? eq(usersTable.name, name) : undefined,
				email ? eq(usersTable.email, email) : undefined,
			]

			const where = filters.length > 0 ? and(...filters) : undefined

			const resultFindAny = db.query.usersTable.findMany({
				where: where,
			})
			console.log((await resultFindAny).keys)
			return resultFindAny ?? null
		} catch (err) {
			console.log(`Erro ao fazer a query no banco de dados: ${err}`)
			return null
		}
	}
	async delete(id: string): Promise<void> {
		await db.delete(usersTable).where(eq(usersTable.id, id))
	}
}
