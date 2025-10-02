import { type UserEntity } from "src/domains/user-entity"

export interface IUserRepository {
	add(user: UserEntity): Promise<UserEntity>
	listAll(): Promise<object[] | null>
	findAny(params: { id?: string; name?: string; email?: string }): Promise<
		object[] | null
	>
	findById(id: string): Promise<UserEntity | null>
	findByEmail(email: string): Promise<UserEntity | null>
	delete(id: string): Promise<void>
}
