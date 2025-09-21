import { getAvailableLocales, getCVByLocale } from '$lib/server/CV/CV';
import { getLocale } from '$lib/paraglide/runtime'
import type { PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';

export const load: PageServerLoad = async () => {
	const currentLocale = getLocale()
	const cv = await getCVByLocale(currentLocale)
	const availableLocales = await getAvailableLocales()
	return { cv, availableLocales, currentLocale }
}
