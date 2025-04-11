// Fiturex: 1. Fazer uma melhor fomar de idade com dd/mm/
// 2. Fazer a query no banco de dados via drizzle

export class FluxoDeCriarcaoUser {
  #name: string | undefined
  #age: number | undefined
  #passWord: string | undefined
  #id: string

  constructor() {
    this.#name = undefined
    this.#age = undefined
    this.#passWord = undefined
    this.#id = this.#createId()
  }
  // Fazendo gettrs para acessar os atributos de forma constrolada:
  get name(): string | undefined {
    return this.#name;
  }
  get age(): number | undefined {
    return this.#age
  }
  get passWord(): string | undefined {
    return this.#passWord
  }
  get id(): string {
    return this.#id
  }
  // Function of class:
  async setName(newName: string): Promise< string | null > {
    try {
      if (typeof newName !== 'string' || newName.trim().length === 0) {
        throw new Error('O nome não é valido')
      }
      this.#name = newName
      return this.#name

    } catch (err: any){
      console.error(`[ Erro tradodo name ]: ${err}`)
      return null
    }
  }
  async setAge(newAge: number): Promise< number | null > {
    try {
      
      const validAge = Number(newAge)
      // Nao sei o por que mas tudo no terminal do node vira string entao tive 
      // que fazer a dinamica de tipagem em runtime mesmo com TS

      if (typeof validAge !== 'number' || !Number.isInteger(validAge)) {
        throw new Error('A idade não e válida')
      }
      this.#age = validAge
      return this.#age
    
    } catch (err: any) {
      console.error(`[ Erro tratado age ]: ${err}`)
      return null
    }   
  }
  async setPassWord(newPassWord: string): Promise<string | null> {
    try {
      if (!this.validaPassWord(newPassWord)) {
        throw new Error('Senha invalida !')
      }
      
      this.#passWord = newPassWord
      return this.#passWord
    } catch (err) {
      console.error(`[ Erro tradado password ]: ${err}`)
      return null
    }

  }
  validaPassWord(pw: string): boolean {
    try {
      if (pw.length < 8 ){
        return false
      }
  
      return true
    } catch (err) {
      console.error(`[ Password ]: ${err}`)
      return false
    }
  }
  #createId(): string{
    const numbers = [1,2,3,4,5,6,7,8,9,0]
    let id = ''
    for (let i = 0; i < 9; i ++) {
      const digit = Math.floor((Math.random() * numbers.length))
      id += numbers[digit]
    }
    return id
  }

  // Fiture para desenvolmento do nome ;]
  #Capitala(name: string): string {
    return name
  }
  
  async createUser(): Promise<{ name: string; age: number; passWord: string; id: string;} | null> {
    try {
      if ([this.name, this.age,this.passWord, this.id].some(item => item === undefined)) throw new Error('Can not creater user') 

      //tenho que colocar algo para colcar o user para o db (post)
      return {
        name: this.#name!,
        age: this.#age!,
        passWord: this.#passWord!,
        id: this.id
      }

    } catch (err: any) {
      console.error(`[ Erro Trado user ]: ${err}`)
      return null

    }
  }
}