<script lang="ts">
	import { Icon } from '@steeze-ui/svelte-icon'
	import type { IconSource } from '@steeze-ui/svelte-icon/types'
	import { onMount } from 'svelte'

	export let name: string
	export let placeholder = ''
	export let focus = false
	export let value = ''
	export let required = false
	export let icon: IconSource = null

	let input: HTMLInputElement

	onMount(() => {
		focus && input.focus()
	})
</script>

<div
	style="display:flex; align-items: center;"
	class={css({
		backgroundColor: 'black',
		border: '2px solid $dark700',
		py: 2,
		px: 3,
		borderRadius: '$default',
		color: '$dark50',
		'&focus-within': {
			borderColor: '$primary500'
		}
	})()}
>
	{#if icon}
		<Icon size="20" src={icon} />
	{/if}

	<input
		tabindex="0"
		bind:this={input}
		id={name}
		{name}
		bind:value
		on:change
		{placeholder}
		style="background-color:transparent"
		class={css({
			fontWeight: '$medium',
			outline: 'none',
			color: '$gray200',
			'&::placeholder': {
				color: '$dark100'
			},
			ml: 2,
			width: '100%',
			fontSize: '$base'
		})()}
		{required}
	/>
</div>
