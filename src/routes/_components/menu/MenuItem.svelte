<script lang="ts">
	import { page } from '$app/stores'

	export let label
	export let href

	$: active = $page.url.pathname === href
</script>

<a
	{href}
	data-active={active}
	class="st-focus-ring rounded mx-2 text-sm py-1.25 pl-8 {active
		? 'bg-indigo-900/50 outline-indigo-900/80 text-white'
		: 'text-gray-300/90 hover:bg-indigo-900/30'}"
>
	<li>
		{label}
	</li>
</a>

<style>
	a[data-active='true'] {
		outline-style: solid;
		outline-offset: 0;
	}
</style>
