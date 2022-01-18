<script lang="ts">
	import { Menu } from '@steeze-ui/heroicons'

	import { GithubLogo } from '@steeze-ui/radix-icons'
	import { Icon } from '@steeze-ui/svelte-icon'

	export let menuOpen
</script>

<header
	class="border-solid flex bg-dark-900/80 border-b-dark-400 border-b-1 flex-shrink-0 h-16 w-full px-6 top-0 left-0 z-50 backdrop-filter backdrop-blur  sticky items-center justify-between"
>
	<div class="flex gap-4 items-center">
		<img alt="logo" src="/logo-v1.svg" width="24px" height="24px" />
		<h1 class="font-semibold text-xl text-light-900">Steeze UI</h1>
	</div>
	<a
		href="https://github.com/steeze-ui/components"
		aria-label="Link to GitHub Repository"
		class="rounded flex align-center st-focus-ring"
	>
		<Icon src={GithubLogo} size="22" color="white" class="hover:text-gray-300/90" />
	</a>
</header>
<div
	class="rounded-full flex bg-primary-900/20 h-12 top-[92vh] left-5 w-12 z-40 fixed items-center justify-center backdrop-filter backdrop-blur-md"
>
	<button class="flex items-center justify-center" on:click={() => (menuOpen = true)}>
		<Icon src={Menu} size="22" color="white" />
	</button>
</div>
