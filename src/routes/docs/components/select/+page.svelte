<script context="module" lang="ts">
	export const prerender = true
</script>

<script lang="ts">
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from '../_data/select'

	import Select from '$lib/select/Select.svelte'
	import { Toggle } from '$lib'
	import { Label } from '$lib/core/parts'

	const items = [
		{ label: 'Flatrail', group: 'Rails' },
		{ label: 'Handrail', group: 'Rails' },
		{ label: 'Wallbank', group: 'Bank' },
		{ label: 'Speedbank', group: 'Bank' },
		{ label: 'A-Frame', group: 'Funbox' },
		{ label: 'Pyramid', group: 'Funbox' }
	]

	let multiple = false
	let searchable = true
	let grouped = true
	let clearable = true
	let taggable = true
</script>

<Component {data} {quickstart} {examples}>
	<div class="demo-container">
		<!-- <Select searchable clearable label="Single" width="12rem" placeholder="Select.." {items} /> -->
		<Select
			label="Multiple"
			width="15rem"
			placeholder="Select.."
			{items}
			{multiple}
			{searchable}
			{clearable}
			retainOnSelect={multiple}
			groupBy={grouped
				? (item) => {
						return item.group
				  }
				: undefined}
			filterBy={(item, text) => {
				return (
					item.label.toLowerCase().includes(text.toLowerCase()) ||
					item.group.toLowerCase().includes(text.toLowerCase())
				)
			}}
			taggable={taggable
				? (v) => {
						return { label: v, group: 'Ungrouped' }
				  }
				: undefined}
			pushTags={taggable}
		/>
	</div>

	<div class="st-small gap-3 flex items-center flex-wrap justify-center">
		<div class="flex gap-2 items-center">
			<Label for="multiple">Multiple</Label>
			<Toggle id="multiple" bind:checked={multiple} />
		</div>
		<div class="seperator" />
		<div class="flex gap-2 items-center">
			<Label for="searchable">Searchable</Label>
			<Toggle id="searchable" bind:checked={searchable} />
		</div>
		<div class="seperator" />
		<div class="flex gap-2 items-center">
			<Label for="grouped">Grouped</Label>
			<Toggle id="grouped" bind:checked={grouped} />
		</div>
		<div class="seperator" />
		<div class="flex gap-2 items-center">
			<Label for="clearable">Clearable</Label>
			<Toggle id="clearable" bind:checked={clearable} />
		</div>
		<div class="seperator" />
		<div class="flex gap-2 items-center">
			<Label for="taggable">Taggable</Label>
			<Toggle id="taggable" bind:checked={taggable} />
		</div>
	</div>
</Component>

<style>
	.seperator {
		height: 1rem;
		width: 1px;
		background-color: rgba(255, 255, 255, 0.15);
	}
</style>
