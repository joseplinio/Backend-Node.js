import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { tokensTable } from "./schema/tokenSchema"
import { usersTable } from "./schema/userSchema"

const poll = new Pool({ connectionString: process.env.DATABASE_URL! })
export const db = drizzle(poll, { schema: { usersTable, tokensTable } })
