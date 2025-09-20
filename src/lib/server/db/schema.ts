import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { InferSelectModel } from 'drizzle-orm';

export const locale = sqliteTable('locale', {
	id: text('id').primaryKey(),
})

export const header = sqliteTable('header', {
	locale: text('locale').references(() => locale.id).primaryKey(),
	mail: text('mail').notNull(),
	phone: text('phone').notNull(),
	address: text('address').notNull(),
	name: text('name').notNull(),
	title: text('title').notNull(),
	dateOfBirth: text('date_of_birth').notNull(),
	about: text('about').notNull(),
})

export const experience = sqliteTable('experience', {
	id: text('id').primaryKey(),
	locale: text('locale').references(() => locale.id),
	title: text('title').notNull(),
	company: text('company').notNull(),
	startDate: text('start_date').notNull(),
	endDate: text('end_date').notNull(),
	responsibilities: text('responsibilities', { mode: 'json' }).$type<string[]>().notNull(),
})

export const education = sqliteTable('education', {
	id: text('id').primaryKey(),
	locale: text('locale').references(() => locale.id),
	grade: text('grade').notNull(),
	school: text('school').notNull(),
	startDate: text('start_date').notNull(),
	endDate: text('end_date').notNull(),
	courses: text('courses', { mode: 'json' }).$type<string[]>().notNull(),
})

export type Locale = InferSelectModel<typeof locale>
export type Header = InferSelectModel<typeof header>
export type Experience = InferSelectModel<typeof experience>
export type Education = InferSelectModel<typeof education>

export type CV = {
	locale: Locale,
	header: Header,
	experiences: Experience[],
	educations: Education[],
}