<script lang="ts">
	import ThemeToggle from '$lib/theme/ThemeToggle.svelte'
	import { Menu } from '@steeze-ui/heroicons'
	import { GithubLogo } from '@steeze-ui/radix-icons'
	import Icon from '@steeze-ui/svelte-icon/Icon.svelte'
	import { menu } from '../stores/menu'
	import Logo from './Logo.svelte'
</script>

<header
	class="border-solid flex border-b-1 flex-shrink-0 h-16 w-full px-6 top-0 left-0 z-50 backdrop-filter backdrop-blur  sticky items-center justify-between"
>
	<a href="/" class="flex gap-4 items-center">
		<Logo />
		<h1 part="name" class="font-semibold text-xl">Steeze UI</h1>
	</a>
	<div class="flex gap-6 items-center">
		<ThemeToggle />
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

<style>
	a:focus-visible {
		outline: var(--st-outline-width) solid var(--st-outline-color);
		border-radius: var(--st-border-radius);
	}

	header {
		background-color: hsla(240, 24%, 9%, 0.8);
		border-color: var(--st-colors-dark5);
	}

	:global(.light header) {
		background-color: hsla(240, 3%, 99%, 0.8);
		border-color: var(--st-colors-light8);
	}

	[part='name'] {
		color: var(--st-body-text-color);
	}

	[part='github-link'] {
		color: var(--st-body-text-color);
	}
</style>
