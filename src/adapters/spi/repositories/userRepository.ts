import { and, eq } from "drizzle-orm"
import type { IUserRepository } from "src/aplication/interface/repositories/IUserRepository"
import { CleanUserMapper } from "src/aplication/mapper/user/cleanUserMapper"
import { UserMapper } from "src/aplication/mapper/user/userMapper"
import { UserEntity } from "src/domains/user-entity"
import { db } from "../drizzle/db/db"
import { usersTable } from "../drizzle/db/schema/userSchema"

export class UserRepository implements IUserRepository {
	async add(user: UserEntity): Promise<UserEntity> {
		const values = UserMapper.toEntity(user)

		const saved = await db.insert(usersTable).values(values).returning()

		return saved[0]
	}
	async listAll(): Promise<object[] | null> {
		try {
			const users = await db.select().from(usersTable)
			const listResult = CleanUserMapper.cleanManyUsers(users)

			return listResult
		} catch (err) {
			console.error(`Erro ao listar o usuarios por ${err}`)
			return null
		}
	}
	async findAny(params: {
		id?: string
		name?: string
		email?: string
	}): Promise<object[] | null> {
		try {
			// Mecher nesse codigo
			const filters = [
				params.id ? eq(usersTable.id, params.id) : undefined,
				params.name ? eq(usersTable.name, params.name) : undefined,
				params.email ? eq(usersTable.email, params.email) : undefined,
			]

			const filter = filters.length > 0 ? and(...filters) : undefined

			const users = await db.query.usersTable.findMany({
				where: filter,
			})
			const resultFindAny = CleanUserMapper.cleanManyUsers(users)

			return resultFindAny
		} catch (err) {
			console.log(`Erro ao fazer a query no banco de dados: ${err}`)
			return null
		}
	}
	async findById(id: string): Promise<UserEntity | null> {
		try {
			const findByIdFilter = eq(usersTable.id, id)

			const idResult = await db.query.usersTable.findFirst({
				where: findByIdFilter,
			})

			if (!idResult)
				throw new Error("Erro in the findByID [it donsn't the idResult]")

			return UserMapper.toDomain(idResult)
		} catch (err) {
			console.log(err)
			return null
		}
	}
	async findByEmail(email: string): Promise<UserEntity | null> {
		try {
			const findByEmailFilter = eq(usersTable.email, email)

			const emailResult = await db.query.usersTable.findFirst({
				where: findByEmailFilter,
			})

			if (!emailResult)
				throw new Error("Erro in the findByEmail [it donsn't the emailResult]")
			
			return UserMapper.toDomain(emailResult)
		} catch (err) {
			console.log(err)
			return null
		}
	}
	async delete(id: string): Promise<void> {
		await db.delete(usersTable).where(eq(usersTable.id, id))
	}
}
