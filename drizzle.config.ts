import "dotenv/config"
import { defineConfig } from "drizzle-kit"

export default defineConfig({
	out: "./drizzele",
	schema: "./src/adapters/spi/drizzle/db/schema/*",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
})
