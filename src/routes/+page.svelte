<script lang="ts">
	import { setLocale } from '$lib/paraglide/runtime';
	import CV from '$lib/components/CV.svelte';

	export let data;
	const { cv, availableLocales } = data;
</script>

<ul>
	{#each availableLocales as locale (locale)}
		<li><button onclick={() => setLocale(locale)}>{locale}</button></li>
	{/each}
</ul>

<CV cv="{cv}" />