<script lang="ts">
	import { page } from '$app/stores'

	export let label
	export let href
	export let disabled = false
	export let tag = ''

	$: active = $page.url.pathname === href
</script>

{#if disabled}
	<li data-disabled class="mx-2 text-sm py-1.25 pl-8 text-gray-500 flex gap-2 items-center">
		{label}
		{#if tag}
			<div part="tag">
				{tag}
			</div>
		{/if}
	</li>
{:else}
	<a
		{href}
		data-active={active}
		class="st-focus-ring rounded mx-2 text-sm py-1.25 pl-8 {active
			? 'bg-indigo-900/50 text-white'
			: 'text-gray-300/80 hover:bg-indigo-900/30'}"
	>
		<li>
			{label}
		</li>
	</a>
{/if}

<style>
	a[data-active='true'] {
		--st-outline-color: rgba(49, 46, 129, 1);
		outline-style: solid;
		outline-offset: 0;
		outline-color: var(--st-outline-color);
		outline-width: var(--st-outline-width);
	}
	a {
		text-decoration-color: transparent;
		border: 0;
		border-color: transparent;
	}

	li[data-disabled] {
		user-select: none;
	}

	[part='tag'] {
		font-size: var(--st-font-size-xs);
		border-radius: var(--st-border-radius);
		background-color: var(--st-colors-dark5);
		padding: 0 0.3rem;
	}
</style>
