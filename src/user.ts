export class FluxoDeCriarcaoUser {
  #name
  #age
  #passWord
  #id
  constructor() {
    this.#name = undefined
    this.#age = undefined
    this.#passWord = undefined
    this.#id = this.createId()
  }
  // Fazendo gettrs para acessar os atributos de forma constrolada:
  get name() {
    return this.#name
  }
  get age() {
    return this.#age
  }
  get passWord() {
    return this.#passWord
  }
  get id() {
    return this.#id
  }
  // Function of class:
  async setName (newName) {
    try {
      if (Number(newName)) throw new Error('Is not string !')
      this.#name = newName
      return this.#name

    } catch (err){
      console.log('Erro tratado: ' + err)
      return process.exit(1)
    }
  }
  async setAge (newAge) {
    try {
      const validNumber = Number(newAge)
      if (isNaN(validNumber)) throw new Error('Is not number!')
        
      this.#age = validNumber
      return this.#age

    } catch (err) {
      console.error('Erro tratado [Age]: ' + err)
      return process.exit(1)
    }
  }
  createId () {
    const numbers = [1,2,3,4,5,6,7,8,9,0]
    let id = ''
    for (let i = 0; i < 9; i ++) {
      const digit = Math.floor((Math.random() * numbers.length))
      id += numbers[digit]
    }
    return id
  }
  async creteUser () {
    try {
      if ([this.name, this.age, this.id].some(item => item === undefined)) throw new Error('Can not creater user') 

      //tenho que colocar algo para colcar o user para o db (post)
      const user = {name: this.name, age: this.age, id: this.id}
      return user 
    } catch (err) {
      console.error('Erro tratado [User]: ' + err)
      return process.exit(1)
    }
  }
}
