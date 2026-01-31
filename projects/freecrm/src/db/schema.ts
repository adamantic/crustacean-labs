import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Users table (synced with Clerk)
export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // Clerk user ID
  email: text('email').notNull(),
  name: text('name'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Contacts table
export const contacts = sqliteTable('contacts', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email'),
  phone: text('phone'),
  company: text('company'),
  jobTitle: text('job_title'),
  notes: text('notes'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Interactions table
export const interactions = sqliteTable('interactions', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').notNull().references(() => users.id),
  contactId: text('contact_id').notNull().references(() => contacts.id),
  type: text('type').notNull(), // 'call', 'email', 'meeting', 'note', 'task'
  subject: text('subject'),
  notes: text('notes'),
  date: integer('date', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
export type Interaction = typeof interactions.$inferSelect;
export type NewInteraction = typeof interactions.$inferInsert;
