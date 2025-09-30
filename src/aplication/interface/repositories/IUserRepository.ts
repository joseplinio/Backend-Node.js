import { type UserEntity } from "src/domains/user-entity"

export interface IUserRepository {
	add(user: UserEntity): Promise<UserEntity>
	listAll(): Promise<UserEntity[] | null>
	findAny(params: { id?: string; name?: string; email?: string }): Promise<
		UserEntity[] | null
	>
	findById(id: string): Promise<UserEntity | null>
	findByEmail(email: string): Promise<UserEntity | null>
	delete(id: string): Promise<void>
}
