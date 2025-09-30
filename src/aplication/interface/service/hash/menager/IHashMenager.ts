export interface IHashManeger {
	validePasswd(hashedPasswd: string, passwd: string): Promise<boolean | null>
}
