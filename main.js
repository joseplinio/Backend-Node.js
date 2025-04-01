import readline from 'node:readline'
import { FluxoDeCriarcaoUser } from './user.js'

const fluxoDeCriacao = new FluxoDeCriarcaoUser()
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const questionAsync = async (question, response) => new Promise( resolve => { 
  rl.question(question, (resp) => { resp(response); resolve(response) })
}) 
(async () => {
  try {
    questionAsync('Quntos ano ')
  } catch (err) {
    console.error(err)
  }

})()


// 1 terminar a main.js fazendo as perguntas via terminal
// puchando na doc do node.js
// 2 Mechar na resposta da api
// 3 Usar os metodos do hash para critografio
// 4 Colocar os user em um Postgres (Docker !)
