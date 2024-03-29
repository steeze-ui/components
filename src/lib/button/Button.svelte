<script lang="ts">
	import Icon from '@steeze-ui/svelte-icon/Icon.svelte'
	import type { IconSource } from '@steeze-ui/svelte-icon/types'
	import { onMount } from 'svelte'

	export let disabled = false
	export let icon: IconSource | undefined = undefined
	export let iconTheme = 'default'
	export let iconSize = '18px'
	export let theme: string = 'secondary'
	export let width = 'initial'

	const props: { 'data-icon'?: string } = {}

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
	data-component="button"
	data-theme={theme}
	style:width
	on:click
	on:pointerdown
	on:focus
	on:blur
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
		--sti-bg-color: transparent;
		--sti-border-color: transparent;
		--sti-color: var(--st-body-text-color);

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

		color: var(--st-button-color, var(--sti-color));
		border-width: var(--st-button-border-width, 1px);
		border-color: var(--st-button-border-color, var(--sti-border-color));
		background-color: var(--st-button-bg-color, var(--sti-bg-color));
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
		opacity: var(--st-field-disabled-opacity);
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
		--sti-bg-color: var(--st-primary-color);
		--sti-color: var(--st-colors-light5);
		--sti-border-color: transparent;
	}
	[data-theme*='primary']:not([disabled]):hover {
		--st-button-hover-bg-color: var(--st-colors-primary5-80pct);
	}

	/* Secondary */
	[data-theme*='secondary'] {
		--sti-bg-color: var(--st-field-bg-color);
		--sti-color: var(--st-field-color);
		--sti-border-color: var(--st-colors-primary8);
	}
	[data-theme*='secondary']:not([disabled]):hover {
		--st-button-hover-bg-color: var(--st-colors-primary9);
	}

	/* Tertiary */
	[data-theme*='tertiary'] {
		--sti-color: var(--st-field-color);
		--sti-bg-color: transparent;
		--sti-border-color: transparent;
	}
	[data-theme*='tertiary']:not([disabled]):hover {
		--st-button-hover-bg-color: var(--st-colors-primary9);
	}

	/* Theme */
	:global(.light [data-component='button'][data-theme*='secondary']) {
		--sti-border-color: var(--st-colors-primary2);
	}
	:global(.light [data-component='button'][data-theme*='secondary']:not([disabled]):hover) {
		--st-button-hover-bg-color: var(--st-colors-primary1);
	}
	:global(.light [data-component='button'][data-theme*='tertiary']:not([disabled]):hover) {
		--st-button-hover-bg-color: var(--st-colors-primary1);
	}
</style>
