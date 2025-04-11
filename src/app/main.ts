import { FluxoDeCriarcaoUser } from './user'
import { createInterface } from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'  
import { encryptingPassWord } from './hash'

const rl = createInterface({input, output})
const fluxoDeCriacao = new FluxoDeCriarcaoUser()

const questionAsync = async (question: string ): Promise< string > => new Promise( resolve => { 
  rl.question(question, (resp) => { resolve( resp ) })
})

async function main () {
  try {
    const inputName = await questionAsync('What is your name: ')
    fluxoDeCriacao.setName(inputName) // fixture valiçao para colcar no db
    
    const inputAge = await questionAsync('how old are you: ')
    fluxoDeCriacao.setAge(inputAge) //fixture /dd/mm
    

    let inputPassWord = await questionAsync('Enter your password [Pls 8 or 12 digits!]:\n')
    while (fluxoDeCriacao.validaPassWord(inputPassWord) != true) {
      // Melhorar a validaçao vendo se a senha é forte ou não !
      inputPassWord = await questionAsync('Enter your password [Pls 8 or 12 digits!]:\n')
    }
    fluxoDeCriacao.setPassWord(inputPassWord)
    const protetionPassword = new encryptingPassWord(inputPassWord)
    await protetionPassword.hashPassWord()
    console.log(await protetionPassword.verifyHash(inputPassWord), protetionPassword.hash)
    
    console.log(await fluxoDeCriacao.createUser())
    
    rl.close()
  } catch (err) {
    console.log(err)
  }
  
}
main()
// 4 Colocar os user em um Postgres (Docker !)
