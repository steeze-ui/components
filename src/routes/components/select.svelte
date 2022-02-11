<script context="module" lang="ts">
	import Select from '$lib/select/Select.svelte'
	import Component from '$lib/_internal/docs/Component.svelte'
	import type { Load } from '@sveltejs/kit'
	export const prerender = true

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/docs/select')
		if (res.ok) {
			const { examples, data, quickstart } = await res.json()
			return {
				props: {
					examples,
					quickstart,
					data
				}
			}
		}
	}
</script>

<script lang="ts">
	export let examples
	export let quickstart = ''
	export let data

	const items = [
		{ id: '1', label: 'Hot' },
		{ id: '2', label: 'New' }
	]
	const itemsWithGroup = [
		{ id: '1', label: 'Flatrail', group: 'Rails' },
		{ id: '2', label: 'Handrail', group: 'Rails' },
		{ id: '3', label: 'Wallbank', group: 'Bank' },
		{ id: '4', label: 'Speedbank', group: 'Bank' },
		{ id: '5', label: 'A-Frame', group: 'Funbox' },
		{ id: '6', label: 'Pyramid', group: 'Funbox' }
	]
</script>

<Component meta={data.meta} features={data.features} docs={data.docs} {quickstart} {examples}>
	<Select label="Filter by" width="12rem" {items} />
	<Select
		width="12rem"
		loop
		searchable
		clearable
		groupBy={(e) => e.group}
		placeholder="Choose Obstacle.."
		items={itemsWithGroup}
	/>
</Component>
