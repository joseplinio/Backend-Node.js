import { argon2d, hash, verify } from "argon2"
import type { IHashService } from "../IHashService"

export class HashService implements IHashService {
	async hash(passwd: string): Promise<string> {
		const hashPasswd = await hash(passwd, { type: argon2d })

		return hashPasswd
	}
	async verify(hashedPasswd: string, passwd: string): Promise<boolean> {
		const passwdInstance = await verify(passwd, hashedPasswd)

		return passwdInstance
	}
}
