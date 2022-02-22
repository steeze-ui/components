<script lang="ts">
	import FieldContainer from '$lib/core/parts/FieldContainer.svelte'
	import { X } from '@steeze-ui/heroicons'
	import Icon from '@steeze-ui/svelte-icon/Icon.svelte'
	import { createEventDispatcher } from 'svelte'

	export let label: string = null
	export let width = '12rem'
	export let helper: string = null
	export let name: string = null
	export let value = ''
	export let placeholder: string = null
	export let disabled = false
	export let required = false
	export let autoselect = false
	export let clearable = false
	export let theme: string = null

	let refInput: HTMLInputElement

	let focused = false

	const dispatch = createEventDispatcher()

	export function clear() {
		const old = value
		value = ''
		dispatch('clear', { old })
	}
</script>

<FieldContainer
	component="text-field"
	on:focus={() => refInput.select()}
	{label}
	{helper}
	{width}
	{disabled}
	{focused}
	{required}
	{theme}
>
	<svelte:fragment slot="label" let:htmlfor let:id>
		<slot name="label" {id} {htmlfor} />
	</svelte:fragment>

	<svelte:fragment slot="prefix">
		<slot name="prefix" />
	</svelte:fragment>

	<input
		slot="default"
		part="value"
		bind:this={refInput}
		let:id
		on:input
		on:change
		let:ariaDescribedby
		let:ariaLabelledby
		{id}
		type="text"
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
	<svelte:fragment slot="suffix">
		<slot name="suffix" />
		{#if clearable && value}
			<button part="clear-button" aria-label="clear value of text input" on:click={clear}>
				<Icon src={X} size="16px" />
			</button>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="helper" let:id let:htmlfor>
		<slot name="helper" {id} {htmlfor} />
	</svelte:fragment>
</FieldContainer>

<style>
	[part='value'] {
		width: 100%;
		flex: auto;
		background-color: transparent;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: var(--st-text-field-text-color, var(--st-field-color));
		font-size: var(--st-text-field-font-size, var(--st-field-font-size));
		font-weight: var(--st-text-field-font-weight, var(--st-field-font-weight));

		padding: 0 0.25rem;
		outline: none;
		height: var(--st-field-height);
	}
	[part='value']::placeholder {
		color: var(--st-placeholder-text-color);
	}

	[part='clear-button'] {
		height: 16px;
		line-height: 1;
		color: var(--st-field-button-color);
	}
	[part='clear-button']:hover {
		color: var(--st-field-button-hover-color);
		transition: color 100ms ease-in;
	}
</style>
