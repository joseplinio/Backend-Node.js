export class FluxoDeCriarcaoUser {
  constructor() {
    this.name = undefined
    this.age = undefined
    this.id = this.createId()
  }
  async defineName (name) {
    try {
      if (null === name || typeof name !== 'string') throw new Erro('Is not string !')
      return this.name = name && true

    } catch (err){
      console.log(err)
    }
  }
  async defineAge (age) {
    try {
      if (typeof age !== 'number' || age === null) throw new Erro('Is not number!')
      return this.age = age && true

    } catch (err) {
      console.error('Erro tratad: ' + err)
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
  creteUser () {
    try {
      if (![this.name, this.age].every(true)) throw new Erro('Can not creater user') 

      return user = {name: this.name, age: this.age, id: this.id}
    } catch (err) {
      console.error(err)
    }
  }
}