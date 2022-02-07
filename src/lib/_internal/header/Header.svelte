<script lang="ts">
	import { Menu, Moon, Sun } from '@steeze-ui/heroicons'

	import { GithubLogo } from '@steeze-ui/radix-icons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { lightTheme } from '../stores/theme'

	export let menuOpen: boolean
</script>

<header
	class="border-solid flex border-b-1 flex-shrink-0 h-16 w-full px-6 top-0 left-0 z-50 backdrop-filter backdrop-blur  sticky items-center justify-between"
>
	<div class="flex gap-4 items-center">
		<img part="logo" alt="logo" src="/logo-v1.svg" width="24px" height="24px" />
		<h1 part="name" class="font-semibold text-xl">Steeze UI</h1>
	</div>
	<div class="flex gap-6 items-center">
		<button
			part="theme-toggle"
			class="flex items-center"
			aria-label="toggle dark/light theme"
			on:click={() => {
				lightTheme.toggle()
			}}
		>
			<Icon src={$lightTheme ? Moon : Sun} size="22" />
		</button>
		<a
			part="github-link"
			href="https://github.com/steeze-ui/components"
			aria-label="Link to GitHub Repository"
			class="rounded flex align-center st-focus-ring"
		>
			<Icon src={GithubLogo} size="22" class="hover:text-gray-300/90" />
		</a>
	</div>
</header>
<div
	class="rounded-full flex bg-primary-900/20 h-12 top-[92vh] left-5 w-12 z-40 fixed items-center justify-center backdrop-filter backdrop-blur-md"
>
	<button class="flex items-center justify-center" on:click={() => (menuOpen = true)}>
		<Icon src={Menu} size="22" color="white" />
	</button>
</div>

<style>
	header {
		background-color: hsla(240, 24%, 9%, 0.8);
		border-color: var(--st-colors-dark5);
	}

	:global(.st-theme-light header) {
		background-color: hsla(240, 3%, 99%, 0.8);
		border-color: var(--st-colors-light8);
	}

	:global(.st-theme-light [part='logo']) {
		background-color: var(--st-colors-dark8);
		padding: 4px;
		width: 30px;
		height: 30px;
		border-radius: var(--st-border-radius-md);
	}

	[part='name'] {
		color: var(--st-colors-light10);
	}

	:global(.st-theme-light [part='name']) {
		color: var(--st-colors-dark6);
	}

	[part='github-link'] {
		color: var(--st-colors-light1);
	}

	:global(.st-theme-light [part='github-link']) {
		color: var(--st-colors-dark6);
	}

	[part='theme-toggle'] {
		color: var(--st-colors-light1);
	}

	:global(.st-theme-light [part='theme-toggle']) {
		color: var(--st-colors-dark6);
	}
</style>
