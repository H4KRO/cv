<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import CV from '$lib/components/CV.svelte';
	import LocaleSelector from '$lib/components/LocaleSelector.svelte';

	export let data;
	const { cv, availableLocales } = data;
</script>

<title>{m.title()}</title>

<div class="sticky top-0 print:hidden">
	<LocaleSelector {availableLocales} />
</div>

<CV {cv} />