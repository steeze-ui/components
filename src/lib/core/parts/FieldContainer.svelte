<script lang="ts">
	import Helper from '$lib/core/parts/Helper.svelte'
	import Label from '$lib/core/parts/Label.svelte'
	import { getId } from '$lib/core/utils/id'

	export let width = '12rem'
	export let label = ''
	export let helper = ''
	export let theme = null
	export let ref = null

	export let disabled = false
	export let focused = false

	const fieldId = getId()
	const labelId = getId()
	const helperId = getId()
</script>

<div
	data-theme={theme}
	style:width
	{...$$restProps}
	data-disabled={disabled ? '' : null}
	data-focused={focused ? '' : null}
	bind:this={ref}
>
	<slot name="label" id={labelId} htmlfor={fieldId} />
	{#if label}
		<Label for={fieldId} id={labelId}>{label}</Label>
	{/if}
	<div part="input-container" on:click on:focus>
		<div part="prefix">
			<slot name="prefix" />
		</div>
		<slot id={fieldId} ariaDescribedby={helperId} ariaLabelledby={labelId} />
		<div part="suffix">
			<slot name="suffix" />
		</div>
	</div>
	<slot name="helper" id={helperId} htmlfor={fieldId} />
	{#if helper}
		<Helper id={helperId} for={fieldId}>{helper}</Helper>
	{/if}
</div>

<style>
	[data-component] {
		gap: 0.25rem;
		display: flex;
		flex-direction: column;
		height: fit-content;
	}

	[part='input-container'] {
		display: flex;
		position: relative;
		overflow: hidden;
		outline: none;
		border: var(--st-field-border-width) solid var(--st-field-border-color);
		height: var(--st-field-height);
		border-radius: var(--st-field-border-radius);
		background-color: var(--st-field-bg-color);
		padding: var(--st-field-padding);
		align-items: center;
		gap: 0.25rem;
		transition: border-color var(--st-field-transition-duration) ease-in;
	}

	[part='prefix'],
	[part='suffix'] {
		display: flex;
		gap: 0.25rem;
		align-items: center;
	}

	/* Disabled */
	[data-disabled] {
		opacity: var(--st-field-disabled-opacity);
	}
	[data-disabled] [part='input-container'] {
		border-style: dashed;
		overflow: hidden;
		cursor: not-allowed;
	}

	/* Hover */
	[data-component]:not([data-focused]):not([data-disabled]):hover {
		--st-label-color: var(--st-field-label-hover-color);
	}

	[data-component]:not([data-focused]):not([data-disabled]):hover [part='input-container'] {
		border-color: var(--st-field-hover-border-color);
		background-color: var(--st-field-hover-bg-color);
		color: var(--st-field-hover-color);
	}

	/* Focus */
	[part='input-container']:focus {
		outline: none;
	}
	[part='input-container']:focus-visible,
	[data-component][data-focused],
	[data-component][data-focused]:hover {
		--st-field-border-color: var(--st-field-focus-border-color);
		--st-label-color: var(--st-field-label-focus-color);
		--st-field-bg-color: var(--st-field-focus-bg-color);
	}

	/* Themes */
	[data-theme*='borderless'] [part='input-container'] {
		border-color: transparent;
	}

	[data-theme*='transparent'] [part='input-container'] {
		background-color: transparent;
	}

	[data-theme*='small'] {
		--st-field-font-size: var(--st-font-size-xs);
		--st-field-padding: var(--st-field-padding-sm);
		--st-field-height: var(--st-field-height-sm);
		--st-field-button-size: var(--st-field-button-size-sm);
	}
</style>
