<script lang="ts">
	import { Check } from '@steeze-ui/heroicons'
	import Icon from '@steeze-ui/svelte-icon/Icon.svelte'

	export let focused: boolean
	export let selected: boolean
</script>

<li
	part="item"
	role="option"
	aria-checked={selected}
	data-focused={focused ? true : null}
	data-selected={selected ? true : null}
	tabindex={focused ? 0 : -1}
	on:pointerover
	on:click
	on:pointerdown
	{...$$restProps}
>
	<div part="selected-icon">
		{#if selected}
			<Icon size="16px" src={Check} />
		{/if}
	</div>
	<span>
		<slot />
	</span>
</li>

<style>
	[part='item'] {
		display: flex;
		align-items: center;
		border-radius: var(--st-item-border-radius, var(--st-border-radius-sm));
		font-size: var(--st-item-font-size, var(--st-field-font-size));
		font-weight: var(--st-item-font-weight, var(--st-field-font-weight));
		color: var(--st-item-text-color, var(--st-body-text-color));
		background-color: var(--st-item-bg-color, transparent);
		cursor: pointer;
		padding: var(--st-item-padding, 0.2rem 0.75rem 0.2rem 0.5rem);
		gap: 0.25rem;
	}
	[part='item'][data-focused] {
		background-color: var(--st-item-focus-bg-color);
		color: var(--st-item-focus-text-color);
	}
	[part='selected-icon'] {
		width: 1rem;
		height: 1rem;
		color: var(--st-item-icon-color);
	}
	[part='item'][data-focused] [part='selected-icon'] {
		color: var(--st-item-focus-icon-color);
	}
</style>
