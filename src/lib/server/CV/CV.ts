import { db } from '$lib/server/db'
import { competence, type CV, education, experience, header, locale } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm'

async function getHeaderByLocale(localeId: string) {
	return db.query.header.findFirst({
		where: eq(header.locale, localeId),
	})
}

async function getExperiencesByLocale(localeId: string) {
	return db.query.experience.findMany({
		where: eq(experience.locale, localeId),
	})
}

async function getEducationsByLocale(localeId: string) {
	return db.query.education.findMany({
		where: eq(education.locale, localeId),
	})
}

async function getCompetencesByLocale(localeId: string) {
	return db.query.competence.findMany({
		where: eq(competence.locale, localeId),
	})
}

export async function getCVByLocale(localeId: string): Promise<CV | null> {
	const [localeRecord, header, experiences, educations, competences] = await Promise.all([
		db.query.locale.findFirst({
			where: eq(locale.id, localeId),
		}),
		getHeaderByLocale(localeId),
		getExperiencesByLocale(localeId),
		getEducationsByLocale(localeId),
		getCompetencesByLocale(localeId),
	])

	if (!localeRecord || !header) {
		return null
	}

	return {
		locale: localeRecord,
		header,
		experiences,
		educations,
		competences
	}
}

export async function getAvailableLocales(): Promise<string[]> {
	return db.query.locale.findMany().then(locales => locales.map(({id: locale}) => locale))
}