<script lang="ts">
	import FieldContainer from '$lib/core/parts/FieldContainer.svelte'
	import { getId } from '$lib/core/utils/id'
	import { X } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'

	export let label = null
	export let width = '12rem'
	export let helper = null
	export let name = null
	export let value = ''
	export let placeholder = null
	export let disabled = false
	export let required = false
	export let autoselect = false
	export let clearable = false

	let refInput: HTMLInputElement

	let focused = false

	const id = () => console.log('For a happy compiler')
	const htmlFor = () => console.log('For a happy compiler')

	export function clear() {
		value = ''
	}
</script>

<FieldContainer
	data-component="text-field"
	on:focus={() => refInput.select()}
	{label}
	{helper}
	{width}
	{disabled}
	{focused}
	{required}
	{...$$restProps}
>
	<slot name="label" slot="label" let:id {id} let:htmlFor {htmlFor} />
	<slot name="prefix" slot="prefix" />
	<input
		tabindex="-1"
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
		on:focus={() => {
			focused = true
			if (autoselect) {
				refInput.select()
			}
		}}
		on:blur={() => (focused = false)}
	/>
	<div part="suffix" slot="suffix">
		<slot name="suffix" />
		{#if clearable && value}
			<button on:click={clear}>
				<Icon src={X} size="16px" />
			</button>
		{/if}
	</div>
	<slot name="helper" slot="helper" let:id {id} let:htmlFor {htmlFor} />
</FieldContainer>

<style>
	[part='value'] {
		width: 100%;
		flex: auto;
		background-color: transparent;
		color: var(--st-text-field-text-color, var(--st-field-color));
		font-size: var(--st-text-field-font-size, var(--st-field-font-size));
		padding: 0 0.25rem;
		outline: none;
		height: var(--st-field-height);
	}

	[part='suffix'] {
		display: flex;
		gap: 0.25rem;
		align-items: center;
	}
	[part='suffix'] button {
		height: 16px;
		line-height: 1;
		color: var(--st-field-button-bg-color);
	}
	[part='suffix'] button:hover {
		color: var(--st-field-button-hover-bg-color);
		transition: color 100ms ease-in;
	}
</style>
