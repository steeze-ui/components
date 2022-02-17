<script>
	import { Theme } from '$lib/core/stores/theme'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { Moon, Sun } from '@steeze-ui/heroicons'
</script>

<button
	class="flex items-center"
	aria-label="toggle dark/light theme"
	on:click={() => {
		Theme.toggle()
	}}
>
	<Icon src={$Theme.isDark ? Sun : Moon} size="22" />
</button>

<style>
	button {
		color: var(--st-body-text-color);
		outline: none;
		border-radius: var(--st-border-radius-md);
	}

	button:hover {
		opacity: 0.8;
	}

	button:focus-visible {
		outline: var(--st-outline-width) solid var(--st-outline-color);
	}
</style>
