<script context="module" lang="ts">
	export const prerender = true
</script>

<script lang="ts">
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/select'

	import Select from '$lib/select/Select.svelte'

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

<Component {data} {quickstart} {examples}>
	<div class="demo-container">
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
	</div>
</Component>
