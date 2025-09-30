import { and, eq } from "drizzle-orm"
import type { IUserRepository } from "src/aplication/interface/repositories/IUserRepository"
import { UserEntity } from "src/domains/user-entity"
import { db } from "../drizzle/db/db"
import { usersTable } from "../drizzle/db/schema/userSchema"

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
				admin: user.admin,
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
			// Mecher nesse codigo
			const filters = [
				id ? eq(usersTable.id, id) : undefined,
				name ? eq(usersTable.name, name) : undefined,
				email ? eq(usersTable.email, email) : undefined,
			]

			const filter = filters.length > 0 ? and(...filters) : undefined

			const resultFindAny = db.query.usersTable.findMany({
				where: filter,
			})

			return resultFindAny ?? null
		} catch (err) {
			console.log(`Erro ao fazer a query no banco de dados: ${err}`)
			return null
		}
	}
	async findById(id: string): Promise<UserEntity | null> {
		try {
			const idResult = await db.query.usersTable.findFirst({
				where: eq(usersTable.id, id),
			})
			return idResult ?? null
		} catch (err) {
			console.log(err)
			return null
		}
	}
	async findByEmail(email: string): Promise<UserEntity | null> {
		try {
			const emailResult = await db.query.usersTable.findFirst({
				where: eq(usersTable.email, email),
			})
			return emailResult ?? null
		} catch (err) {
			console.log(err)
			return null
		}
	}
	async delete(id: string): Promise<void> {
		await db.delete(usersTable).where(eq(usersTable.id, id))
	}
}
