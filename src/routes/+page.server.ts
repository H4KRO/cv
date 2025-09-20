import { getAvailableLocales, getCVByLocale } from '$lib/server/CV/CV';
import type { PageServerLoad } from '../../.svelte-kit/types/src/routes/cv/$types'
import { getLocale } from '$lib/paraglide/runtime'

export const load: PageServerLoad = async () => {
	const cv = await getCVByLocale(getLocale())
	const availableLocales = await getAvailableLocales()
	return { cv, availableLocales }
}
