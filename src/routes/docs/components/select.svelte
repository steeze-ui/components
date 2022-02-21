<script context="module" lang="ts">
	export const prerender = true
</script>

<script lang="ts">
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/select'

	import Select from '$lib/select/Select.svelte'

	const items = [
		{ id: '1', label: 'Hot', meta: 'black' },
		{ id: '2', label: 'New', meta: 'white' }
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
		<!-- <Select searchable clearable label="Single" width="12rem" placeholder="Select.." {items} /> -->
		<Select
			searchable
			clearable
			label="Multiple"
			width="12rem"
			placeholder="Select.."
			retainOnSelect
			filterBy={(item, text) => {
				return (
					item.label.toLowerCase().includes(text.toLowerCase()) ||
					item.meta.toLowerCase().includes(text.toLowerCase())
				)
			}}
			taggable={(v) => {
				return { id: v.toLowerCase(), label: v, meta: '' }
			}}
			pushTags
			multiple
			{items}
		/>
		<!-- <Select
			width="12rem"
			loop
			searchable
			clearable
			groupBy={(e) => e.group}
			placeholder="Choose Obstacle.."
			items={itemsWithGroup}
		/> -->
	</div>
</Component>
