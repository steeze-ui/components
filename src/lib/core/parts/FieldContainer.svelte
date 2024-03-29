<script lang="ts">
	import Helper from '$lib/core/parts/Helper.svelte'
	import Label from '$lib/core/parts/Label.svelte'
	import { getId } from '$lib/core/stores/id'

	//refs
	export let ref: HTMLElement | undefined = undefined
	export let refField: HTMLElement | undefined = undefined
	export let refLabel: HTMLElement | undefined = undefined

	//appearance
	export let component = 'field-container'
	export let theme: string = ''
	export let width = 'var(--st-field-width)'
	export let height = 'var(--st-field-height)'
	export let label = ''
	export let helper = ''

	// states
	export let disabled = false
	export let required = false
	export let focused = false
	export let expanded = false
	export let multiple = false

	// ids
	export const fieldId = getId()
	const labelId = getId()
	const helperId = getId()
</script>

<div
	data-field-container
	data-component={component}
	data-theme={theme}
	data-disabled={disabled ? '' : null}
	data-required={required ? '' : null}
	data-focused={focused ? '' : null}
	data-expanded={expanded ? '' : null}
	data-multiple={multiple ? '' : null}
	bind:this={ref}
	style:width
>
	{#if label}
		<div part="label">
			<Label bind:ref={refLabel} for={fieldId} id={labelId}>{label}</Label>
			{#if required}
				<span part="required-indicator" aria-hidden="true" />
			{/if}
		</div>
	{/if}
	<slot name="label" id={labelId} htmlfor={fieldId} />
	<div
		data-input-container
		{...$$restProps}
		bind:this={refField}
		on:click
		on:focus
		on:blur
		style:height
	>
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
	[data-field-container] {
		gap: 0.25rem;
		display: flex;
		flex-direction: column;
		height: fit-content;
	}

	[data-input-container] {
		display: flex;
		position: relative;
		overflow: hidden;
		outline: none;
		border: var(--st-field-border-width) solid var(--st-field-border-color);
		border-radius: var(--st-field-border-radius);
		background-color: var(--st-field-bg-color);
		padding: var(--st-field-padding);
		align-items: center;
		min-height: var(--st-field-min-height);
	}

	[part='label'] {
		display: flex;
		gap: 0.25rem;
		position: relative;
		align-items: center;
		justify-content: flex-start;
		line-height: 1;
	}

	[data-field-container][data-required] [part='required-indicator']::after {
		content: var(--st-field-required-indicator, '•');
		color: var(--st-field-required-indicator-color);
	}

	[part='prefix'],
	[part='suffix'] {
		display: flex;
		gap: 0.25rem;
		align-items: center;
	}

	/* [data-field-container][data-expanded] {
		--st-field-bg-color: var(--st-field-expanded-bg-color);
	} */

	[data-field-container][data-multiple] {
		--st-field-height: auto;
		--st-field-min-height: var(--st-field-height-md);
		--st-field-padding: 0.325rem 0.75rem;
	}

	/* Disabled */
	[data-disabled] {
		opacity: var(--st-field-disabled-opacity);
	}
	[data-disabled] [data-input-container] {
		border-style: dashed;
		overflow: hidden;
		cursor: not-allowed;
	}

	/* Hover */
	[data-field-container]:not([data-focused]):not([data-disabled]):hover {
		--st-label-color: var(--st-field-label-hover-color);
	}

	[data-field-container]:not([data-focused]):not([data-disabled]):hover [data-input-container] {
		border-color: var(--st-field-hover-border-color);
		background-color: var(--st-field-hover-bg-color);
		color: var(--st-field-hover-color);
	}

	/* Focus */
	[data-input-container]:focus {
		outline: none;
	}
	[data-input-container]:focus-visible,
	[data-field-container][data-focused],
	[data-field-container][data-focused]:hover {
		--st-field-border-color: var(--st-field-focus-border-color);
		--st-label-color: var(--st-field-label-focus-color);
		--st-field-bg-color: var(--st-field-focus-bg-color);
	}

	/* Themes */
	[data-theme*='borderless'] [data-input-container] {
		border-color: transparent;
	}

	[data-theme*='transparent'] [data-input-container] {
		background-color: transparent;
	}

	:global(.st-small [data-field-container]),
	[data-theme*='small'] {
		--st-field-font-size: var(--st-font-size-xs);
		--st-field-padding: var(--st-field-padding-sm);
		--st-field-height: var(--st-field-height-sm);
		--st-field-button-size: var(--st-field-button-size-sm);
	}
</style>
