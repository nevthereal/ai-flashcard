import { DB_TOKEN, DB_URL } from '$env/static/private';
import { drizzle } from 'drizzle-orm/libsql';

export const db = drizzle({
	connection: {
		url: DB_URL,
		authToken: DB_TOKEN
	},
	casing: 'snake_case'
});
