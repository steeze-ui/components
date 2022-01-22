<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon'
	import type { IconSource } from '@steeze-ui/svelte-icon/types'

	export let disabled = false
	export let icon: IconSource = null
	export let iconTheme = 'default'
	export let theme: ButtonTheme = 'secondary'
	export let size: ButtonSize = 'sm'

	$: iconSize = icon && getIconSize(size)

	type ButtonSize = 'sm' | 'md' | 'lg'
	type ButtonTheme = 'primary' | 'secondary' | 'tertiary'

	function getIconSize(size: ButtonSize) {
		switch (size) {
			case 'sm':
				return '14px'
			case 'md':
				return '20px'
			case 'lg':
				return '24px'
			default:
				return '14px'
		}
	}
</script>

<button {...$$restProps} {disabled} data-theme={theme} data-size={size} on:click>
	{#if icon}
		<Icon theme={iconTheme} src={icon} width={iconSize} height={iconSize} />
	{/if}
	<slot />
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--st-border-radius);
		border: 1px solid var(--st-button-border-color);
		transition: var(--st-hover-transition);
		outline: none;
		gap: 0.5rem;
		line-height: 1;

		background-color: var(--st-button-bg-color);
		color: var(--st-button-color);
		font-size: var(--st-field-font-size);
		height: var(--st-field-size);
	}
	button:hover {
		background-color: var(--st-button-hover-bg-color);
	}
	/* Sizes */
	[data-size='sm'] {
		--st-field-font-size: var(--st-font-size-sm);
		--st-field-size: var(--st-field-size-sm);
		padding: 0.375rem;
	}
	[data-size='md'] {
		--st-field-font-size: var(--st-font-size-md);
		--st-field-size: var(--st-field-size-md);
		padding: 0.5rem;
	}
	[data-size='lg'] {
		--st-field-font-size: var(--st-font-size-lg);
		--st-field-size: var(--st-field-size-lg);
		padding: 0.8rem 1rem;
	}

	/* Color Themes */
	[data-theme*='primary'] {
		--st-button-bg-color: var(--st-primary-color);
		--st-button-color: var(--st-colors-light5);
		--st-button-border-color: var(--st-primary-lighter-color);
	}
	button[data-theme*='primary']:hover {
		/* --st-button-bg-color: var(--st-primary-dark-color); */
		--st-button-hover-bg-color: var(--st-primary-lighter-color);
	}

	[data-theme*='tertiary'] {
		--st-button-bg-color: transparent;
		--st-button-border-color: transparent;
	}
	button[data-theme*='tertiary']:hover {
		/* --st-button-bg-color: var(--st-tertiary-dark-color); */
		--st-button-hover-bg-color: rgba(51, 65, 85, 0.2);
	}
</style>
