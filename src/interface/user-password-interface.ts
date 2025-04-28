export interface IPassWordHesher {
	hash(pw: string): Promise<string>
}
