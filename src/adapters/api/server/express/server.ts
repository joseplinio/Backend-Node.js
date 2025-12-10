import cookieParser from "cookie-parser"
import "dotenv/config"
import express from "express"
import "jsonwebtoken"
import "reflect-metadata"
import "src/adapters/api/conteiner/conteiner"
import { authMiddleware } from "./Middleware/authMiddleware"
import { adminRouter } from "./routers/admin/adiminRoutery"
import { authRouter } from "./routers/auth/authRoutery"
import { userRouter } from "./routers/user/userRoutery"

const app = express()
const port = process.env.PORT ?? 5050
app.use(express.json())
app.use(cookieParser())

app.use("/users", authMiddleware, userRouter)
app.use("/admin",  adminRouter)
app.use("/auth", authRouter)

app.listen(port, () => {
	const linha = "============================="

	console.log(`${linha}\n`)
	console.log(" - API RODANDO COM SUCESSO -")
	console.log()
	console.log(`| Port       : ${port}`)
	console.log(`| Mode       : development`)
	console.log()
	console.log(`${linha}\n`)
})
