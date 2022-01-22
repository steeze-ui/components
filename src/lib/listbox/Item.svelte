<script lang="ts">
	import { Check } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'

	export let focused
	export let selected
</script>

<li
	part="item"
	role="menuitem"
	aria-checked={selected}
	data-focused={focused}
	data-selected={selected}
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
		border-radius: var(--st-border-radius-sm);
		background-color: var(--st-item-bg-color);
		font-size: var(--st-item-font-size);
		font-weight: var(--st-item-font-weight);
		color: var(--st-item-text-color);
		cursor: pointer;
		padding: var(--st-item-padding);
		gap: 0.25rem;
	}
	[part='item'][data-focused='true'] {
		background-color: var(--st-item-focus-bg-color);
		color: var(--st-item-focus-text-color);
	}
	[part='selected-icon'] {
		width: 1rem;
		height: 1rem;
		color: var(--st-item-icon-color);
	}
	[part='item'][data-focused='true'] [part='selected-icon'] {
		color: var(--st-item-focus-icon-color);
	}
</style>
