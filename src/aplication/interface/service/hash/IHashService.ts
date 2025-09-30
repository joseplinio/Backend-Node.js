export interface IHashService {
	hash(passwd: string): Promise<string>
	verify(passwd: string, hashedPasswd: string): Promise<boolean>
}
