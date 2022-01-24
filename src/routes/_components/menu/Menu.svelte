<script>
	import { X } from '@steeze-ui/heroicons'

	import { Icon } from '@steeze-ui/svelte-icon'

	export let menuOpen
</script>

<aside
	style="max-height: calc(100% - 4rem)"
	class="{menuOpen
		? 'flex'
		: 'hidden'}  z-50 border-solid flex-col flex-nowrap h-full border-r-dark-300 border-r-1 min-h-0 py-4 top-16 bottom-0 left-0 w-64 justify-start items-stretch overflow-auto fixed md:flex "
>
	<button class="flex top-5 right-5 absolute md:hidden" on:click={() => (menuOpen = false)}>
		<Icon src={X} size="18" color="white" />
	</button>
	<ul class="flex flex-col gap-4">
		<slot />
	</ul>
</aside>

<style>
	aside {
		z-index: 100;
		background-color: var(--st-colors-dark9);
	}
</style>
