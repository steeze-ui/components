<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon'
	import type { IconSource } from '@steeze-ui/svelte-icon/types'
	import { onMount } from 'svelte'

	export let disabled = false
	export let icon: IconSource = null
	export let iconTheme = 'default'
	export let theme: ButtonTheme = 'secondary'
	export let width = 'min-content'

	type ButtonTheme = 'primary' | 'secondary' | 'tertiary'

	const props = {}

	onMount(() => {
		if (!$$slots.default) {
			props['data-icon'] = ''
		}
	})
</script>

<button {...props} {...$$restProps} {disabled} data-theme={theme} style:width on:click>
	{#if icon}
		<Icon theme={iconTheme} src={icon} width={'20px'} height={'20px'} />
	{/if}
	<slot />
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		outline: none;
		gap: 0.5rem;
		line-height: 1;
		border-radius: var(--st-button-border-radius);
		border: 1px solid var(--st-button-border-color);
		transition: var(--st-hover-transition);
		background-color: var(--st-button-bg-color);
		color: var(--st-button-color);
		font-size: var(--st-button-font-size);
		height: var(--st-button-size);
		padding: var(--st-button-padding);
	}
	button:hover {
		background-color: var(--st-button-hover-bg-color);
	}
	button:active {
		transform: scale(0.95);
	}
	button:disabled {
		cursor: not-allowed;
	}
	button:disabled {
		opacity: 0.5;
	}

	/* Color Themes */
	[data-theme*='primary'] {
		--st-button-bg-color: var(--st-primary-color);
		--st-button-color: var(--st-colors-light5);
		--st-button-border-color: transparent;
	}
	button[data-theme*='primary']:hover {
		--st-button-hover-bg-color: var(--st-colors-primary4);
	}
	button[data-theme*='primary']:disabled:hover {
		--st-button-hover-bg-color: var(--st-button-bg-color);
	}

	[data-theme*='secondary'] {
		--st-button-bg-color: var(--st-field-bg-color);
		--st-button-color: var(--st-field-color);
		--st-button-border-color: var(--st-colors-primary8);
	}
	button[data-theme*='secondary']:hover {
		--st-button-hover-bg-color: var(--st-colors-primary9);
	}
	button[data-theme*='secondary']:disabled:hover {
		--st-button-hover-bg-color: var(--st-button-bg-color);
	}

	[data-theme*='tertiary'] {
		--st-button-bg-color: transparent;
		--st-button-border-color: transparent;
	}
	button[data-theme*='tertiary']:hover {
		--st-button-hover-bg-color: var(--st-colors-primary9);
	}
	button[data-theme*='tertiary']:disabled:hover {
		--st-button-hover-bg-color: var(--st-button-bg-color);
	}

	button:focus {
		outline: none;
	}
	button:focus-visible {
		outline: var(--st-outline-width) solid var(--st-outline-color);
	}

	button[data-icon] {
		width: var(--st-button-size) !important;
		height: var(--st-button-size);
		padding: 0;
	}
</style>
