<script lang="ts">
	import '$lib/theme/dark.css'
	import 'virtual:windi.css'
	import './../markdown.css'
	import Header from './_components/header/Header.svelte'
	import Menu from './_components/menu/Menu.svelte'
	import MenuItem from './_components/menu/MenuItem.svelte'
	import MenuSection from './_components/menu/MenuSection.svelte'

	let menuOpen = false

	import { afterNavigate } from '$app/navigation'

	afterNavigate(() => {
		menuOpen = false
	})
</script>

<Header bind:menuOpen />
<div class="flex flex-grow relative">
	<Menu bind:menuOpen>
		<MenuSection label="Overview">
			<MenuItem label="Introduction" href="/" />
			<MenuItem label="Getting Started" href="/overview/getting-started" />
			<MenuItem label="Styling" href="/overview/styling" />
		</MenuSection>
		<MenuSection label="Components">
			<MenuItem label="Select" href="/components/select" />
			<MenuItem label="Multiselect" href="/components/multiselect" />
			<MenuItem label="Popover" href="/components/popover" />
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
