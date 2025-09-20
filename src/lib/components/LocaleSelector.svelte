<script lang="ts">
	import { setLocale } from '$lib/paraglide/runtime';
	import { tick } from 'svelte';

	export let availableLocales: string[] = [];

	let open = false;
	let selected: string | null = null;

	let rootEl: HTMLElement | null = null;
	let itemButtons: HTMLButtonElement[] = [];
	let focusedIndex = -1;

	function toggle() {
		open = !open;
		if (open) {
			queueFocus(0);
		}
	}

	function handleWindowClick(e: MouseEvent) {
		if (!rootEl) return;
		const target = e.target as Node | null;
		if (target && !rootEl.contains(target)) {
			open = false;
		}
	}

	function handleTriggerKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			open = true;
			queueFocus(0);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			open = true;
			queueFocus(availableLocales.length - 1);
		} else if (e.key === 'Escape') {
			open = false;
		}
	}

	function handleMenuKeydown(e: KeyboardEvent) {
		if (!open) return;

		if (['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) {
			e.preventDefault();
		}

		if (e.key === 'ArrowDown') {
			queueFocus(Math.min(focusedIndex + 1, availableLocales.length - 1));
		} else if (e.key === 'ArrowUp') {
			queueFocus(Math.max(focusedIndex - 1, 0));
		} else if (e.key === 'Home') {
			queueFocus(0);
		} else if (e.key === 'End') {
			queueFocus(availableLocales.length - 1);
		} else if (e.key === 'Escape') {
			open = false;
		} else if (e.key === 'Enter' || e.key === ' ') {
			if (focusedIndex >= 0) {
				choose(availableLocales[focusedIndex]);
			}
		}
	}

	function refreshItems() {
		itemButtons = Array.from(rootEl?.querySelectorAll<HTMLButtonElement>('.item-btn') ?? []);
	}

	async function queueFocus(index: number) {
		await tick();
		refreshItems();
		focusedIndex = index;
		itemButtons[index]?.focus();
	}

	function choose(locale: string) {
		setLocale(locale);
		selected = locale;
		open = false;
	}
</script>

<svelte:window on:click={handleWindowClick} />

<div class="selector" class:open={open} bind:this={rootEl}>
	<button
		type="button"
		class="trigger"
		aria-haspopup="listbox"
		aria-expanded={open}
		aria-controls="locale-menu"
		on:click={toggle}
		on:keydown={handleTriggerKeydown}
	>
		<span class="trigger__label">{selected ?? 'Choisir la langue'}</span>
		<svg class="chevron" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
			<path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08z" clip-rule="evenodd" />
		</svg>
	</button>

	<ul
		id="locale-menu"
		class="menu"
		role="listbox"
		tabindex="-1"
		on:keydown={handleMenuKeydown}
	>
		{#each availableLocales as locale (locale)}
			<li>
				<button
					type="button"
					class="item-btn"
					role="option"
					aria-selected={selected === locale}
					on:click={() => choose(locale)}
				>
					{locale}
					{#if selected === locale}
						<span class="sr-only"> (sélectionné)</span>
					{/if}
				</button>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.selector {
		@apply relative inline-block text-left;

		.trigger {
			@apply flex items-center gap-2 rounded-full border border-zinc-300 bg-white/80 px-3 py-1.5 text-sm font-medium text-zinc-800 shadow-sm backdrop-blur transition
				hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
				dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-200;
		}

		.chevron {
			@apply h-4 w-4 text-zinc-500 transition-transform duration-200;
		}

		&.open .chevron {
			@apply rotate-180;
		}

		.menu {
			@apply absolute right-0 z-50 mt-2 w-44 origin-top-right rounded-xl border border-zinc-200 bg-white/95 p-1 shadow-lg ring-1 ring-black/5 backdrop-blur transition
				dark:border-zinc-700 dark:bg-zinc-900;

			/* Closed state */
			@apply pointer-events-none scale-95 opacity-0;
		}

		&.open .menu {
			@apply pointer-events-auto scale-100 opacity-100;
		}

		.item-btn {
			@apply flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 focus:bg-zinc-100 focus:outline-none
				dark:text-zinc-200 dark:hover:bg-zinc-800;

			&[aria-selected='true'] {
				@apply bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300;
			}
		}
	}

	/* Visually hidden (screen reader only) */
	.sr-only {
		@apply absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0;
		clip: rect(0, 0, 0, 0);
	}
</style>
