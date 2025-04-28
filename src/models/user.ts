import { randomUUID } from "node:crypto"

export class User {
	public id: string
	public name: string
	public age: number
	public hashPassWord: string

	constructor(
		id: string = randomUUID(),
		name: string,
		age: number,
		hashPassWord: string,
	) {
		this.id = id
		this.name = name
		this.age = age
		this.hashPassWord = hashPassWord
	}
}
