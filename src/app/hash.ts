

import argon2d  from "argon2";

export class encryptingPassWord {
  private passWord: string

  // trata como string mas de inicio ela é um null
  private hashedPassWord: string | null = null

 constructor(passWord: string) {
  this.passWord = passWord
 }
  async hashPassWord(): Promise <string | boolean> {
    try { 
      // Uso dinamico entre "", pois eu noa tinha pesado em fazer isso tratra o hash como objeto, para ser melhor manipulado !
      this.hashedPassWord = await argon2d.hash(this.passWord);
      return this.hashedPassWord

    } catch (err: any) {
      console.error(`[ Erro tratad: ${err}]`)
      return false
    }
  }
  async verifyHash(inputPw: string): Promise < boolean > {
    try {
      if (!this.hashedPassWord) {
        throw new Error('Hash ainda não foi feito!')
      }
      return await argon2d.verify(this.hashedPassWord, inputPw)
    } catch (err: any) {
      console.error(`${err}`)
      return false
    }
  }
  get hash(): string | null {
    return this.hashedPassWord
  }
}