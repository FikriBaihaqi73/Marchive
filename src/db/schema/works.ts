import { pgTable, serial, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { categories } from './categories';

export const works = pgTable('works', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  categoryId: integer('category_id').references(() => categories.id, { onDelete: 'cascade' }),
  type: varchar('type', { length: 50 }).notNull().default('book'), // 'book' or 'single'
  status: varchar('status', { length: 50 }).notNull().default('draft'), // 'draft' or 'published'
  cover: text('cover'),
  synopsis: text('synopsis'),
  content: text('content'), // Used primarily for 'single' type works
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
