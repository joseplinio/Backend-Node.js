import { boolean, pgTable, varchar } from "drizzle-orm/pg-core"

export const sessionUser = pgTable("sessionUser", {
	userID: varchar().notNull().unique(),
	accessID: varchar().notNull().unique(),
	refreshID: varchar().notNull().unique(),
	createAt: varchar().notNull(),
	revoked: boolean().notNull(),
})
