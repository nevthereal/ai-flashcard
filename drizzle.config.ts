import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

if (!process.env.DB_URL || !process.env.DB_TOKEN) {
	throw new Error('DB_URL or DB_TOKEN not found in .env file');
}

export default defineConfig({
	out: './drizzle',
	schema: './src/lib/server/db/schema.ts',
	dialect: 'turso',
	dbCredentials: {
		url: process.env.DB_URL,
		authToken: process.env.DB_TOKEN
	},
	casing: 'snake_case'
});
