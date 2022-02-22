<script lang="ts">
	import FieldContainer from '$lib/core/parts/FieldContainer.svelte'
	import { createEventDispatcher } from 'svelte'

	export let label: string = null
	export let helper: string = null
	export let name: string = null
	export let value = ''
	export let placeholder: string = null
	export let disabled = false
	export let required = false
	export let autoselect = false
	export let theme: string = null
	export let width = 'var(--st-field-width)'
	export let height = 'auto'

	let refInput: HTMLTextAreaElement

	let focused = false

	const dispatch = createEventDispatcher()
</script>

<FieldContainer
	component="text-area"
	on:focus={() => refInput.select()}
	{label}
	{helper}
	{disabled}
	{focused}
	{required}
	{theme}
	{width}
	{height}
>
	<svelte:fragment slot="label" let:htmlfor let:id>
		<slot name="label" {id} {htmlfor} />
	</svelte:fragment>

	<textarea
		slot="default"
		part="value"
		bind:this={refInput}
		let:id
		on:input
		on:change
		let:ariaDescribedby
		let:ariaLabelledby
		{id}
		aria-labelledby={ariaLabelledby}
		aria-describedby={ariaDescribedby}
		bind:value
		{placeholder}
		{required}
		{disabled}
		{name}
		{...$$restProps}
		on:focus={() => {
			focused = true
			if (autoselect) {
				refInput.select()
			}
			dispatch('focus')
		}}
		on:blur={() => {
			focused = false
			dispatch('blur')
		}}
	/>

	<svelte:fragment slot="helper" let:id let:htmlfor>
		<slot name="helper" {id} {htmlfor} />
	</svelte:fragment>
</FieldContainer>

<style>
	:global([data-component='text-area']) {
		--st-field-padding: 0.35rem;
	}

	[part='value'] {
		width: 100%;
		flex: auto;
		background-color: transparent;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: var(--st-text-area-text-color, var(--st-field-color));
		font-size: var(--st-text-area-font-size, var(--st-field-font-size));
		font-weight: var(--st-text-area-font-weight, var(--st-field-font-weight));

		white-space: pre-wrap;
		align-self: stretch;
		line-height: inherit;

		padding: 0rem;
		outline: none;
	}
	[part='value']::placeholder {
		color: var(--st-placeholder-text-color);
	}
</style>
