<script lang="ts">
	import { browser } from '$app/env'
	import { afterNavigate } from '$app/navigation'
	import '$lib/theme/dark.css'
	import 'virtual:windi.css'
	import './../markdown.css'
	import Header from './_components/header/Header.svelte'
	import Menu from './_components/menu/Menu.svelte'
	import MenuItem from './_components/menu/MenuItem.svelte'
	import MenuSection from './_components/menu/MenuSection.svelte'
	import { lightTheme } from './_stores/theme'

	let menuOpen = false

	afterNavigate(() => {
		menuOpen = false
	})

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
			<MenuItem label="Introduction" href="/" />
			<MenuItem label="Getting Started" href="/overview/getting-started" />
			<MenuItem label="Styling" href="/overview/styling" />
			<MenuItem label="Accessibility" href="/overview/accessibility" />
		</MenuSection>
		<MenuSection label="Components">
			<MenuItem label="Button" href="/components/button" />
			<MenuItem tag="Planned" disabled label="Dialog" href="/components/dialog" />
			<MenuItem tag="Planned" disabled label="Notification" href="/components/notification" />
			<MenuItem label="Popover" href="/components/popover" />
			<MenuItem label="Select" href="/components/select" />
			<MenuItem tag="Planned" disabled label="Tabs" href="/components/tabs" />
			<MenuItem label="Toggle" href="/components/toggle" />
			<MenuItem tag="Planned" disabled label="Tooltip" href="/components/tooltip" />
		</MenuSection>
		<MenuSection label="Icons">
			<MenuItem label="About" href="/icons" />
			<MenuItem label="Icon Packs" href="/icons/packs" />
			<MenuItem label="Icon Components" href="/icons/components" />
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
