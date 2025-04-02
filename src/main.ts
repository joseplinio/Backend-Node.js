import { FluxoDeCriarcaoUser } from './user.js'
import { createInterface } from 'node:readline'
import { stdin as input, stdout as output } from 'node:process'  

const rl = createInterface({input, output})
const fluxoDeCriacao = new FluxoDeCriarcaoUser()

const questionAsync = async (question) => new Promise( resolve => { 
  rl.question(question, (resp) => { resolve( resp ) })
  /**
 * A funcao (async) faz uma pergunata via interface do readline fazendo uma Promise
 * e retornado da Promise a pergunta e resposta do user sendo uma (var)
 * 
 * @param {string} question 
 * @returns resposta do usuario
 */
})

async function main () {
  try {
    const inputName = await questionAsync('What is your name: ')
    fluxoDeCriacao.setName(inputName)
  
    const inputAge = await questionAsync('how old are you: ')
    fluxoDeCriacao.setAge(inputAge)
  
    console.log(await fluxoDeCriacao.creteUser())
  
    rl.close()
  } catch (err) {
    console.log(err)
  }
  
}
main()
// 1 terminar a main.js fazendo as perguntas via terminal
// 2 Mechar na resposta da api
// 3 Usar os metodos do hash para critografio
// 4 Colocar os user em um Postgres (Docker !)
