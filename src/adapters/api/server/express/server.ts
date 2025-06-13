import "reflect-metadata"
import express from "express"
import "dotenv/config"
import "src/adapters/api/conteiner/conteiner"
import { userRouter } from "./routers/user/userRoutery"

const app = express()
const port = process.env.PORT

app.use(express.json())

app.use("/users", userRouter)

app.listen(port, () => {
	const linha = "============================="

	console.log(`\n${linha}`)
	console.log(" - API RODANDO COM SUCESSO -")
	console.log(`${linha}\n`)

	console.log(`📡 Porta       : ${port}`)
	console.log(`🌍 Ambiente    : development`)
	console.log(`🔗 Endpoint    : http://localhost:${port}/users\n`)

	console.log(`${linha}\n`)
})
