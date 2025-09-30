import { inject, injectable } from "tsyringe"
import type { IHashService } from "../IHashService"
import type { IHashManeger } from "./IHashMenager"

@injectable()
export class HashManeger implements IHashManeger {
	constructor(@inject("HashService") private hashService: IHashService) {}

	async validePasswd(
		hashedPasswd: string,
		passwd: string,
	): Promise<boolean | null> {
		try {
			if (!passwd || !hashedPasswd) {
				throw new Error(
					"Error in the validePasswd (MenagerPasswd) - dosen't has the hashpasswd | passwd",
				)
			}

			const isValid = await this.hashService.verify(passwd, hashedPasswd)

			if (!isValid) throw new Error("Return of isValid: " + isValid)

			return isValid
		} catch (err) {
			console.log(err)
			return null
		}
	}
}
