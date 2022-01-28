<script lang="ts">
	import { getId } from '$lib/core/utils/id'

	import Table from './Table.svelte'

	export let data: { [section: string]: { [key: string]: string | string[] }[] } = {}

	const id = getId()

	let index = 0

	$: sections = Object.keys(data)

	$: current = data[sections?.[index]] ?? []
</script>

<div
	part="tabs"
	role="tablist"
	aria-orientation="horizontal"
	dir="ltr"
	aria-label="Manage your account"
	tabindex="0"
	data-orientation="horizontal"
	style="outline: none;"
>
	{#each sections as section, i}
		{@const isSelected = i === index}
		<button
			part="tab"
			on:click={() => (index = i)}
			type="button"
			role="tab"
			aria-selected={isSelected}
			aria-controls="steeze-{id}-content-tab{i}"
			data-state={isSelected ? 'active' : 'inactive'}
			id="steeze-{id}-trigger-tab{i}"
			tabindex={isSelected ? 0 : -1}
			data-orientation="horizontal">{section}</button
		>
	{/each}
</div>

<Table data={current} />

<style>
	[part='tabs'] {
		display: flex;
		gap: 2rem;
		border-bottom: 1px solid var(--st-colors-gray10);
		width: fit-content;
	}

	[part='tab'] {
		padding: 1rem 0;
		font-weight: var(--st-font-weight-medium);
		border-bottom-width: 2px;
		border-bottom-style: solid;
		border-bottom-color: transparent;
	}
	[part='tab'][data-state='active'],
	[part='tab'][data-state='active']:hover {
		color: var(--st-colors-primary4);
		border-bottom-color: var(--st-colors-primary4);
	}
	[part='tab']:hover {
		border-bottom-color: var(--st-colors-gray9);
	}
</style>
