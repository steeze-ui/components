<script lang="ts">
	import { browser } from '$app/env'
	import { afterNavigate } from '$app/navigation'
	import '$lib/base.css'
	import 'virtual:windi.css'
	import './../markdown.css'
	import Header from './_components/header/Header.svelte'
	import Menu from './_components/menu/Menu.svelte'
	import MenuItem from './_components/menu/MenuItem.svelte'
	import MenuSection from './_components/menu/MenuSection.svelte'
	import Select from '$lib/select/Select.svelte'
	import { lightTheme } from './_stores/theme'

	let menuOpen = false

	const menu = {
		Overview: {
			Introduction: '/',
			'Getting Started': '/overview/getting-started',
			Styling: '/overview/styling',
			Accessibility: '/overview/accessibility'
		},
		Components: {
			'Form Input': {
				Select: '/components/select',
				'Combo Box': '_/components/combo-box',
				'Radio Group': '_/components/radio-group',
				Checkbox: '_/components/checkbox',
				'Text Field': '_/components/text-field',
				'Number Field': '_/components/number-field',
				'Text Area': '_/components/text-area',
				Toggle: '/components/toggle'
			},
			'Visualization & Interaction': {
				Button: '/components/button',
				Tooltip: '/components/tooltip',
				Popover: '/components/popover',
				Grid: '_/components/grid',
				Carousel: '_/components/carousel',
				Details: '_/components/details',
				'Dropdown Menu': '_/components/dropdown-menu',
				Tabs: '_/components/tabs',
				Accordion: '_/components/accordion',
				Notification: '_/components/notification',
				Dialog: '_/components/dialog'
			},
			Layouts: {
				Flex: '_/components/flex',
				Split: '_/components/split',
				Scrollable: '_/components/scrollable'
			}
		},
		Icons: {
			About: '/icons',
			'Icon Packs': '/icons/packs',
			'Icon Components': '/icons/components'
		}
	}

	$: filteredItems = (
		!selectedFilter || selectedFilter.id === '0'
			? [].concat(
					Object.entries(menu['Components']['Form Input']),
					Object.entries(menu['Components']['Visualization & Interaction']),
					Object.entries(menu['Components']['Layouts'])
			  )
			: Object.entries(menu['Components'][selectedFilter?.label])
	) as [string, string][]

	$: sortedItems = filteredItems.sort(([firstLabel], [secondLabel]) =>
		firstLabel > secondLabel ? 1 : -1
	)

	afterNavigate(() => {
		if (menuOpen) {
			menuOpen = false
		}
	})

	let filterItems = ['All', ...Object.keys(menu['Components'])].map((e, i) => ({
		id: i.toString(),
		label: e
	}))
	let selectedFilter = filterItems[0]

	$: {
		if (browser) {
			if ($lightTheme) {
				document.body.className = 'light-theme'
			} else {
				document.body.className = 'dark-theme'
			}
		}
	}
</script>

<svelte:body />

<Header bind:menuOpen />
<div class="flex flex-grow relative">
	<Menu bind:menuOpen>
		<MenuSection label="Overview">
			{#each Object.keys(menu['Overview']) as label}
				<MenuItem {label} href={menu['Overview'][label]} />
			{/each}
		</MenuSection>
		<MenuSection label="Components">
			<Select
				width="6rem"
				slot="label-suffix"
				theme="small transparent"
				items={filterItems}
				bind:value={selectedFilter}
			/>
			{#each sortedItems as [label, href]}
				{@const isPlanned = href.startsWith('_')}
				<MenuItem disabled={isPlanned} tag={isPlanned ? 'Planned' : ''} {label} {href} />
			{/each}
		</MenuSection>
		<MenuSection label="Icons">
			{#each Object.keys(menu['Icons']) as label}
				<MenuItem {label} href={menu['Icons'][label]} />
			{/each}
		</MenuSection>
	</Menu>
	<main class="flex flex-col flex-grow max-w-full flex-1 py-16 items-center md:pl-64">
		<div
			style="max-width:700px"
			class="mx-auto flex-shrink-0 w-full px-8 text-indigo-400 prose relative"
		>
			<slot />
		</div>
	</main>
</div>
