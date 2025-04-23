import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import type { usersTable } from './schema';

const db = drizzle(process.env.DATABASE_URL!)
async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: ''
  }
}