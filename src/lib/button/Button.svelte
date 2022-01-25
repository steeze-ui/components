<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon'
	import type { IconSource } from '@steeze-ui/svelte-icon/types'
	import { onMount } from 'svelte'

	export let disabled = false
	export let icon: IconSource = null
	export let iconTheme = 'default'
	export let iconSize = '18px'
	export let theme: string = 'secondary'
	export let width = 'initial'

	const props = {}

	onMount(() => {
		if (!$$slots.default) {
			props['data-icon'] = ''
		}
	})
</script>

<button
	{...props}
	{...$$restProps}
	{disabled}
	part="button"
	data-theme={theme}
	style:width
	on:click
>
	<slot name="prefix">
		{#if icon}
			<Icon theme={iconTheme} src={icon} width={iconSize} height={iconSize} />
		{/if}
	</slot>
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
		border-style: solid;
		height: var(--st-button-height, var(--st-field-height));
		padding: var(--st-button-padding, var(--st-field-padding));
		font-size: var(--st-button-font-size, var(--st-field-font-size));
		font-weight: var(--st-button-font-weight, var(--st-field-font-weight));
		border-radius: var(--st-button-border-radius, var(--st-field-border-radius));
		transition: var(--st-button-transition, var(--st-hover-transition));

		color: var(--st-button-color, var(--st-body-text-color));
		border-width: var(--st-button-border-width, 1px);
		border-color: var(--st-button-border-color, transparent);
		background-color: var(--st-button-bg-color, transparent);
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
	button:focus {
		outline: none;
	}
	button:focus-visible {
		outline: var(--st-outline-width) solid var(--st-outline-color);
	}
	[data-icon] {
		width: var(--st-button-height, var(--st-field-height)) !important;
		height: var(--st-button-height, var(--st-field-height));
		padding: 0;
	}

	/* Primary */
	[data-theme*='primary'] {
		--st-button-bg-color: var(--st-primary-color);
		--st-button-color: var(--st-colors-light5);
		--st-button-border-color: transparent;
	}
	[data-theme*='primary']:hover {
		--st-button-hover-bg-color: var(--st-colors-primary5-80pct);
	}
	[data-theme*='primary']:disabled:hover {
		--st-button-hover-bg-color: var(--st-button-bg-color);
	}

	/* Secondary */
	[data-theme*='secondary'] {
		--st-button-bg-color: var(--st-field-bg-color);
		--st-button-color: var(--st-field-color);
		--st-button-border-color: var(--st-colors-primary8);
	}
	[data-theme*='secondary']:hover {
		--st-button-hover-bg-color: var(--st-colors-primary9);
	}
	[data-theme*='secondary']:disabled:hover {
		--st-button-hover-bg-color: var(--st-button-bg-color);
	}

	/* Tertiary */
	[data-theme*='tertiary'] {
		--st-button-color: var(--st-field-color);
		--st-button-bg-color: transparent;
		--st-button-border-color: transparent;
	}
	[data-theme*='tertiary']:hover {
		--st-button-hover-bg-color: var(--st-colors-primary9);
	}
	[data-theme*='tertiary']:disabled:hover {
		--st-button-hover-bg-color: var(--st-button-bg-color);
	}
</style>
