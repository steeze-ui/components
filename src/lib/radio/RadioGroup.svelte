<script lang="ts">
	import { Label } from '$lib/core/parts'

	import { getId } from '$lib/core/stores/id'
	import type { RadioGroupOrientation } from '$lib/core/types'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'

	export let name: string = null
	export let orientation: RadioGroupOrientation = 'horizontal'
	export let label: string = null
	export let value: string = null

	const id = getId()

	//name
	if (!name) {
		name = id
	}
	setContext('ST_RADIO_NAME', name)

	//value
	const valueStore = writable(value)
	setContext('ST_RADIO_VALUE', valueStore)

	$: {
		value = $valueStore
	}
</script>

<div data-component="radio-group">
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<div part="items" role="radiogroup" data-orientation={orientation} aria-orientation={orientation}>
		<slot />
	</div>
</div>

<style>
	[data-component] {
		display: flex;
		flex-direction: column;
		gap: var(--st-radio-group-gap, 0.25rem);
	}
	[part='items'] {
		display: flex;
	}
	[part='items'][data-orientation='horizontal'] {
		flex-direction: row;
		gap: var(--st-radio-group-items-horizontal-gap, 0.75rem);
	}
	[part='items'][data-orientation='vertical'] {
		flex-direction: column;
		gap: var(--st-radio-group-items-vertical-gap, 0.5rem);
	}
</style>
