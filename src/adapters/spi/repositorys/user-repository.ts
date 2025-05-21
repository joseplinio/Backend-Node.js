import { IUserRepository } from "../../../aplication/interface/repository/IUserRepository"
import { UserEntity } from "../../../domains/user-entity"
import { db } from "../drizzle/db/db"
import { usersTable } from "../drizzle/db/schema"
import { eq } from "drizzle-orm"


export class UserRepository implements IUserRepository {
	async add(item: UserEntity): Promise<UserEntity> {
		const saved = await db
			.insert(usersTable)
			.values({
				id: item.id,
				name: item.name,
				age: item.age,
				email: item.email,
				hashpasswd: item.hashpasswd
			})
			.returning()

		return saved[0]
	}

	async findbyid(id: string): Promise<UserEntity | null> {
		try {
			const result = await db.select().from(usersTable).where(eq(usersTable.id, id)) // Vem em forma de Array
			const user = result[0]
			
			return user ?? null
		} catch(err) {
			console.error('Erro ao buscar usuário por ID:', err)
			return null
		}
	}

	async delete(id: string): Promise<void> {
		await db.delete(usersTable).where(eq(usersTable.id, id))
	}
	

}
