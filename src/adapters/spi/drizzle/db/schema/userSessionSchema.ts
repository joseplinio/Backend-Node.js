import { boolean, pgTable, varchar } from "drizzle-orm/pg-core"

export const sessionUser = pgTable("sessionUser", {
	userID: varchar().notNull(),
	accessID: varchar().notNull().unique(),
	refreshID: varchar().notNull().unique(),
	createAt: varchar().notNull(),
	// expreisAt: varchar().notNull(),
	revoked: boolean().notNull(),
})
