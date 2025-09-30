import { boolean, integer, pgTable, varchar } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
	id: varchar().notNull().unique().primaryKey(),
	name: varchar({ length: 100 }).notNull(),
	age: integer().notNull(),
	email: varchar().notNull().unique(),
	hashpasswd: varchar().notNull(),
	admin: boolean().notNull().default(false),
})
