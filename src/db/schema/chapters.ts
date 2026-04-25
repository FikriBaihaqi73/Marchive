import { pgTable, serial, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';
import { works } from './works';

export const chapters = pgTable('chapters', {
  id: serial('id').primaryKey(),
  workId: integer('work_id').references(() => works.id, { onDelete: 'cascade' }).notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  order: integer('order').notNull().default(0),
  status: varchar('status', { length: 50 }).notNull().default('draft'), // 'draft' or 'published'
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
