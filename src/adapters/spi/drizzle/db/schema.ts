import { integer, pgTable, varchar } from "drizzle-orm/pg-core"

export const usersTable = pgTable("users", {
	id: varchar().notNull().unique().primaryKey(),
	name: varchar().notNull(),
	age: integer().notNull(),
	email: varchar().notNull(),
	hashpasswd: varchar().notNull(),
})
