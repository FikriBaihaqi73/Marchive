import { pgTable, serial, text, varchar, timestamp, integer, boolean } from 'drizzle-orm/pg-core';
import { works } from './works';
import { chapters } from './chapters';

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  workId: integer('work_id').references(() => works.id, { onDelete: 'cascade' }),
  chapterId: integer('chapter_id').references(() => chapters.id, { onDelete: 'cascade' }),
  parentId: integer('parent_id').references((): any => comments.id, { onDelete: 'cascade' }),
  isAdmin: boolean('is_admin').default(false).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
