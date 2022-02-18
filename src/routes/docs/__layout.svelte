<script lang="ts">
	import { afterNavigate } from '$app/navigation'
	import '$lib/base.css'
	import '$lib/normalize.css'
	import Select from '$lib/select/Select.svelte'
	import MenuItem from '$lib/_internal/menu/MenuItem.svelte'
	import Menu from '$lib/_internal/menu/Menu.svelte'
	import MenuSection from '$lib/_internal/menu/MenuSection.svelte'
	import { menu } from '$lib/_internal/stores/menu'

	$: filteredItems = (
		!selectedFilter || selectedFilter.id === '0'
			? [].concat(
					Object.entries($menu.map['Components']['Form Input']),
					Object.entries($menu.map['Components']['Visualization & Interaction']),
					Object.entries($menu.map['Components']['Layouts'])
			  )
			: Object.entries($menu.map['Components'][selectedFilter?.label])
	) as [string, string][]

	$: sortedItems = filteredItems.sort(([firstLabel], [secondLabel]) =>
		firstLabel > secondLabel ? 1 : -1
	)

	afterNavigate(() => {
		if ($menu.opened) {
			menu.setOpened(false)
		}
	})

	let filterItems = ['All', ...Object.keys($menu.map['Components'])].map((e, i) => ({
		id: i.toString(),
		label: e
	}))
	let selectedFilter = filterItems[0]
</script>

<div class="flex flex-grow relative">
	<Menu>
		<MenuSection label="Overview">
			{#each Object.keys($menu.map['Overview']) as label}
				<MenuItem {label} href={$menu.map['Overview'][label]} />
			{/each}
		</MenuSection>
		<MenuSection label="Components">
			<Select
				ariaLabel="Filter Menu Items by Type"
				width="6rem"
				slot="label-suffix"
				theme="small transparent"
				items={filterItems}
				bind:value={selectedFilter}
			/>
			{#each sortedItems as [label, href]}
				{@const isPlanned = href.startsWith('_')}
				{@const isHidden = href.startsWith('__')}
				{#if !isHidden}
					<MenuItem disabled={isPlanned} tag={isPlanned ? 'Planned' : ''} {label} {href} />
				{/if}
			{/each}
		</MenuSection>
		<MenuSection label="Icons">
			{#each Object.keys($menu.map['Icons']) as label}
				<MenuItem {label} href={$menu.map['Icons'][label]} />
			{/each}
		</MenuSection>
	</Menu>
	<main class="flex flex-col flex-grow max-w-full flex-1 py-16 items-center md:pl-64">
		<div style="max-width:700px" class="mx-auto flex-shrink-0 w-full px-8  prose relative">
			<slot />
		</div>
	</main>
</div>
