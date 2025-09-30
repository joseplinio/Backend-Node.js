import "dotenv/config"
import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import { usersTable } from "./schema/userSchema"
import { sessionUser } from "./schema/userSessionSchema"

const poll = new Pool({ connectionString: process.env.DATABASE_URL! })
export const db = drizzle(poll, { schema: { usersTable, sessionUser } })
