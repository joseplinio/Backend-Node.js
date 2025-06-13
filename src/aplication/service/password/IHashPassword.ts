export interface IHashPassword {
  hashPassword(password: string): Promise<string>

  verifyPassword(password:string, hasehedPassWord: string): Promise<boolean>
}
