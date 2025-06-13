import { argon2d, hash, verify } from "argon2"
import { injectable } from "tsyringe"
import type { IHashPassword } from "./IHashPassword"

@injectable()
export default class serviceHashPassword implements IHashPassword {
	async hashPassword(password: string): Promise<string> {
		return await hash(password, { type: argon2d })
	}

	async verifyPassword(
		password: string,
		hasehedPassWord: string,
	): Promise<boolean> {
		return verify(password, hasehedPassWord)
	}
}
