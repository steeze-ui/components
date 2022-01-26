<script lang="ts">
	import Helper from '$lib/core/parts/Helper.svelte'
	import Label from '$lib/core/parts/Label.svelte'
	import { getId } from '$lib/core/utils/id'

	// export let refField = null
	export let width = '12rem'
	export let label = ''
	export let helper = ''
	export let disabled = false
	export let focused = false
	export let theme = null

	const fieldId = getId()
	const labelId = getId()
	const helperId = getId()
</script>

<div
	data-theme={theme}
	style:width
	{...$$restProps}
	data-disabled={disabled}
	data-focused={focused}
>
	<slot name="label" id={labelId} htmlFor={fieldId} />
	{#if label}
		<Label for={fieldId} id={labelId}>{label}</Label>
	{/if}
	<div part="input-field" on:click on:focus tabindex="0">
		<slot name="prefix" />
		<div part="value-container">
			<slot id={fieldId} ariaDescribedby={helperId} ariaLabelledby={labelId} />
		</div>
		<slot name="suffix" />
	</div>
	<slot name="helper" id={helperId} htmlFor={fieldId} />
	{#if helper}
		<Helper id={helperId} for={fieldId}>{helper}</Helper>
	{/if}
</div>

<style>
	div:first-child {
		gap: 0.25rem;
		display: flex;
		flex-direction: column;
	}

	[part='value-container'] {
		display: flex;
		align-items: center;
	}

	[part='input-field'] {
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

	/* Disabled */
	[part='input-field'][data-disabled='true'] {
		border-style: dashed;
		overflow: hidden;
		cursor: not-allowed;
		opacity: 0.7;
	}
	[part='input-field'][data-disabled='true']:hover {
		background-color: var(--st-field-bg-color);
	}

	/* Hover */
	div:first-child[data-focused='false']:hover {
		--st-label-color: var(--st-field-label-hover-color);
	}

	div:first-child[data-focused='false']:hover [part='input-field'] {
		--st-field-border-color: var(--st-field-hover-border-color);
		--st-field-bg-color: var(--st-field-hover-bg-color);
	}

	/* Focus */
	[part='input-field']:focus {
		outline: none;
	}
	[part='input-field']:focus-visible,
	div:first-child[data-focused='true'],
	div:first-child[data-focused='true']:hover {
		--st-field-border-color: var(--st-field-focus-border-color);
		--st-label-color: var(--st-field-label-focus-color);
		--st-field-bg-color: var(--st-field-focus-bg-color);
	}

	/* Themes */
	[data-theme*='borderless'] [part='input-field'] {
		border-color: transparent;
	}

	[data-theme*='transparent'] [part='input-field'] {
		background-color: transparent;
	}
</style>
