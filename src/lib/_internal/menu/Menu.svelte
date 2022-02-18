<script>
	import { Menu, X } from '@steeze-ui/heroicons'

	import { Icon } from '@steeze-ui/svelte-icon'
	import { menu } from '../stores/menu'
</script>

<aside
	style="max-height: calc(100% - 4rem)"
	class="{$menu.opened
		? 'flex'
		: 'hidden'}  z-50 border-solid flex-col flex-nowrap h-full border-r-1 min-h-0 py-4 top-16 bottom-0 left-0 w-64 justify-start items-stretch overflow-auto fixed md:flex "
>
	<button class="flex top-5 right-5 absolute md:hidden" on:click={() => menu.setOpened(false)}>
		<Icon src={X} size="18" color="white" />
	</button>
	<ul class="flex flex-col gap-4">
		<slot />
	</ul>
</aside>
<div
	class="rounded-full flex md:hidden bg-primary-900/20 h-12 top-[92vh] left-5 w-12 z-40 fixed items-center justify-center backdrop-filter backdrop-blur-md"
>
	<button
		class="flex items-center justify-center"
		on:click={() => menu.setOpened(true)}
		aria-label="toggle menu"
	>
		<Icon src={Menu} size="22" color="white" />
	</button>
</div>

<style>
	aside {
		z-index: 100;
		background-color: var(--st-primary-bg-color);
		border-color: var(--st-colors-dark4);
	}

	:global(.light aside) {
		border-color: var(--st-colors-light8);
	}
</style>
