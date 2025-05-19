import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const list = sqliteTable('list', {
	id: int().primaryKey(),
	name: text().notNull()
});

export const flashcard = sqliteTable('flashcard', {
	id: text().primaryKey(),
	listId: text()
		.notNull()
		.references(() => list.id),
	term: text().notNull(),
	definition: text().notNull()
});
