<script lang="ts">
	import FieldContainer from '$lib/core/parts/FieldContainer.svelte'
	import { getId } from '$lib/core/stores/id'
	import { ChevronDown } from '@steeze-ui/heroicons'
	import Icon from '@steeze-ui/svelte-icon/Icon.svelte'
	import { onMount } from 'svelte'

	//appearance
	export let theme: string = null
	export let label: string = null
	export let helper: string = null
	export let width: string = '12rem'

	//form
	export let name = null
	export let value = null
	export let disabled = false
	export let focus = false
	export let required = false

	// refs
	let refSelect
	let focused = false

	// ids
	let id = getId()

	onMount(() => {
		if (focus) {
			refSelect.focus()
		}
	})
</script>

<FieldContainer
	component="native-select"
	{label}
	{helper}
	{width}
	{disabled}
	{required}
	{focused}
	{theme}
>
	<svelte:fragment slot="label" let:htmlfor let:id>
		<slot name="label" {id} {htmlfor} />
	</svelte:fragment>

	<svelte:fragment slot="prefix">
		<slot name="prefix" />
	</svelte:fragment>

	<svelte:fragment slot="default" let:id let:ariaDescribedby let:ariaLabelledby>
		<select
			part="select"
			aria-labelledby={ariaLabelledby}
			aria-describedby={ariaDescribedby}
			{id}
			{disabled}
			{required}
			{name}
			{...$$restProps}
			bind:this={refSelect}
			bind:value
			on:focus={() => {
				focused = true
			}}
			on:blur={() => {
				focused = false
			}}
			on:change
		>
			<slot />
		</select>
	</svelte:fragment>

	<svelte:fragment slot="suffix">
		<slot name="suffix">
			<div part="indicator">
				<Icon src={ChevronDown} size="16" />
			</div>
		</slot>
	</svelte:fragment>

	<svelte:fragment slot="helper" let:id let:htmlfor>
		<slot name="helper" {id} {htmlfor} />
	</svelte:fragment>
</FieldContainer>

<style>
	:global([data-component='native-select']) {
		--st-field-hover-border-color: var(--st-field-border-color);
		--st-field-hover-bg-color: var(--st-field-expanded-bg-color);
		--st-field-padding: 0;
	}

	[part='select']:focus {
		outline: none;
	}

	[part='select'] {
		font-size: var(--st-select-font-size, var(--st-field-font-size));
		font-weight: var(--st-select-font-weight, var(--st-field-font-weight));
		color: var(--st-select-color, var(--st-field-color));
		padding: var(--st-native-select-padding, var(--st-field-padding-md));
		color: var(--st-native-select-color, var(--st-field-color));
		cursor: pointer;
		overflow: hidden;

		appearance: none;
		font-size: var(--st-native-select-font-size, var(--st-field-font-size));
		border: 1px solid transparent;
		border-left: none;
		outline: none;
		background: none;
		box-shadow: none;
		width: 0;
		height: 100%;
		max-width: 100%;
		flex-grow: 1;
		z-index: 1;
	}

	[part='indicator'] {
		position: absolute;
		right: 0.5rem;
		display: flex;
		justify-content: center;
		color: var(--st-native-select-button-color, var(--st-field-button-color));
	}
</style>
