import { IUserRepository } from "../../../aplication/interface/repository/IUserRepository"
import { UserEntity } from "../../../domains/user-entity"
import { db } from "../drizzle/db/db"
import { usersTable } from "../drizzle/db/schema"
import { eq } from "drizzle-orm"


export class UserRepository implements IUserRepository {
	async add(user: UserEntity): Promise<UserEntity> {
		const saved = await db
			.insert(usersTable)
			.values({
				id: user.id,
				name: user.name,
				age: user.age,
				email: user.email,
				hashpasswd: user.hashpasswd
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
	async findbyid(id: string): Promise<UserEntity | null> {
		try {
			const result = await db.select().from(usersTable).where(eq(usersTable.id, id))
			const user = result[0]
			
			return user ?? null
		} catch(err) {
			console.error(`Erro ao buscar usuário por ID: ${err}`)
			return null
		}
	}

	async delete(id: string): Promise<void> {
		await db.delete(usersTable).where(eq(usersTable.id, id))
	}
	
	

}
