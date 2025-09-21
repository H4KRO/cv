<script lang="ts">
	import { setLocale } from '$lib/paraglide/runtime';
	export let availableLocales: string[] = ['en', 'fr'];
	export let currentLocale: string;
	let isOpen = false;

	function toggle() { isOpen = !isOpen; }
	function selectLocale(locale: string) {
		setLocale(locale);
		currentLocale = locale;
		isOpen = false;
	}
	function handleBlur() { setTimeout(() => { isOpen = false; }, 200); }

	const localeFlags = {
		en: 'us',
		fr: 'fr'
	};
</script>

<div class="relative inline-block">
	<button
		type="button"
		on:click={toggle}
		on:blur={handleBlur}
		aria-haspopup="listbox"
		aria-expanded={isOpen}
	>
		<span class="fi fi-{localeFlags[currentLocale]} cursor-pointer"></span>
	</button>

	{#if isOpen}
		<ul class="absolute left-0 md:bottom-auto md:top-full top-auto bottom-full" role="listbox" tabindex="-1">
			{#each availableLocales as locale (locale)}
				{#if locale != currentLocale}
				<li>
					<button
						type="button"
						on:click={() => selectLocale(locale)}
						role="option"
					>
						<span class="fi fi-{localeFlags[locale]} cursor-pointer"></span>
					</button>
				</li>
					{/if}
			{/each}
		</ul>
	{/if}
</div>
