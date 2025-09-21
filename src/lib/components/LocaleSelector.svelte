<script lang="ts">
	import { setLocale } from '$lib/paraglide/runtime';
	export let availableLocales: string[] = [];
	export let currentLocale: string;
	let isOpen = false;

	function toggle() {
		isOpen = !isOpen;
	}

	function selectLocale(locale: string) {
		setLocale(locale);
		currentLocale = locale;
		isOpen = false;
	}

	function handleBlur() {
		setTimeout(() => { isOpen = false; }, 200);
	}
</script>

<div class="relative inline-block">
	<button
		type="button"
		on:click={toggle}
		on:blur={handleBlur}
		aria-haspopup="listbox"
		aria-expanded={isOpen}
	>
		{currentLocale}
	</button>

	{#if isOpen}
		<ul
			class="absolute left-0 md:bottom-auto md:top-full top-auto bottom-full"
			role="listbox"
			tabindex="-1"
		>
			{#each availableLocales as locale (locale)}
				<li>
					<button
						type="button"
						on:click={() => selectLocale(locale)}
						role="option"
					>
						{locale}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
