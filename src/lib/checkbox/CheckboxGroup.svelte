<script lang="ts">
	import { Label } from '$lib/core/parts'

	import { getId } from '$lib/core/stores/id'
	import type { GroupOrientation } from '$lib/core/types'
	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'

	export let name = null
	export let orientation: GroupOrientation = 'horizontal'
	export let label: string = null
	export let value: string[] = null

	const id = getId()

	//name
	if (!name) {
		name = id
	}
	setContext('ST_CHECKBOX_NAME', name)

	//value
	const valueStore = writable(value)
	setContext('ST_CHECKBOX_VALUE', valueStore)
	$: {
		value = $valueStore
	}
</script>

<div data-component="checkbox">
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
		gap: var(--st-checkbox-gap, 0.25rem);
	}
	[part='items'] {
		display: flex;
	}
	[part='items'][data-orientation='horizontal'] {
		flex-direction: row;
		gap: var(--st-checkbox-items-horizontal-gap, 0.75rem);
	}
	[part='items'][data-orientation='vertical'] {
		flex-direction: column;
		gap: var(--st-checkbox-items-vertical-gap, 0.5rem);
	}
</style>
