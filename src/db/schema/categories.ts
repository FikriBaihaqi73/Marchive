import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  type: varchar('type', { length: 50 }).notNull().default('book'), // 'book' or 'single'
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
