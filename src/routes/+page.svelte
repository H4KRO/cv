<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import CV from '$lib/components/CV.svelte';
	import LocaleSelector from '$lib/components/LocaleSelector.svelte';

	export let data;
	const { cv, availableLocales, currentLocale } = data;
</script>

<title>{m.title()}</title>

<div class="fixed bottom-2 right-2 md:top-2 md:left-2 md:bottom-auto md:right-auto print:hidden z-50">
	<LocaleSelector {availableLocales} {currentLocale} />
</div>


<CV {cv} />