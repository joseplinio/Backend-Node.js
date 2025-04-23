import { createInterface } from 'node:readline'
import {stdin as input, stdout as output} from 'node:process'
import { UserRepository } from './repository/user-repository'
import { User } from './models/user'

const rl = createInterface( { input, output } )

const questionAsync = async <T> (
  // Passa um tipo genirico "T", parser sendo o processo de entrada retornar o tipo generico. Logo depois a promessa da funçao com o (resolve) usa o rl. para fazer a pergunta e o (resp) por conta do metodo readline precisa da resposta, retorna o resolve que pode ser a parte positiva da async () fazendo com que o que o user der entrada como idade vire o tipo do "T"
  
  question: string,
  parser: (input: string) => T
  
): Promise <T> => new Promise((resolve) => {
  rl.question(question, (resp) => {
    resolve(parser(resp))
  })
})

const userRepository = new UserRepository()

async function main () {
  try {
    const inputName = await questionAsync('What is your name: ', input => input)    
    const inputAge = await questionAsync('how old are you: ', input => parseInt(input, 10))
    
    const inputPassWord = await questionAsync('Enter your password [Pls 8 or 12 digits!]:\n', input => input)
    rl.close()

    
    const newUser = new User(undefined, inputName, inputAge, inputPassWord)
    const saved = await userRepository.save(newUser)
    
    console.log(saved)
  } catch (err) {
    console.error(err)
  }
  
}
main()