import argon2d from "argon2"
import type { IPassWordHesher } from "../../interface/user-password-interface"

export class HashPassWord implements IPassWordHesher {
	hash(pw: string): Promise<string> {
		const hash = argon2d.hash(pw)

		return hash
	}
}
