import { plainToInstance } from "class-transformer"
import { validate } from "class-validator"
import { db } from "../db"
import { usersTable } from "../db/schema"
import { CreateUserRequestDTO } from "../dto/create-user-request-dto"
import type { IUserRepository } from "../interface/user-repository-interface"
import { User } from "../models/user"
import { HashPassWord } from "../utils/security/hash-pass-word"

const hashPassWord = new HashPassWord()

export class UserRepository implements IUserRepository {
	async save(user: User): Promise<User> {
		const uservalided = plainToInstance(CreateUserRequestDTO, user) as User
		const errors = await validate(uservalided)

		if (errors.length > 0) {
			console.log(errors)
			throw new Error()
		}

		const saved = await db
			.insert(usersTable)
			.values({
				id: uservalided.id,
				name: uservalided.name,
				age: uservalided.age,
				hashPassWord: await hashPassWord.hash(uservalided.hashPassWord),
			})
			.returning()

		return saved[0]
	}
}
