import type { UserEntity } from "src/domains/user-entity"

export class CleanUserMapper {
	static cleanUser(user: UserEntity): object {
		const cleanUser = {
			userID: user.userID,
			name: user.name,
			age: user.age,
			email: user.email,
			admin: user.admin,
		}

		return cleanUser
	}

	static cleanManyUsers(users: UserEntity[]): object[] {
		// good logic for user the map, i need to improve this logic,
		// with Arrays.
		const cleanUsers = users.map(({ hashpasswd, ...rest }) => rest)

		return cleanUsers
	}
}
