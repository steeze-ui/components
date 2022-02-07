<script lang="ts">
	import { page } from '$app/stores'

	export let label
	export let href
	export let disabled = false
	export let tag = ''

	$: active = $page.url.pathname === href
</script>

{#if disabled}
	<li
		part="menu-item"
		aria-disabled="true"
		data-disabled
		class="mx-2 text-sm py-1.25 pl-8 flex gap-2 items-center"
	>
		{label}
		{#if tag}
			<div part="tag">
				{tag}
			</div>
		{/if}
	</li>
{:else}
	<a
		part="menu-item"
		{href}
		data-active={active ? true : null}
		class="st-focus-ring rounded mx-2 text-sm py-1.25 pl-8"
	>
		<li>
			{label}
		</li>
	</a>
{/if}

<style>
	a[data-active] {
		outline-style: solid;
		outline-offset: 0;
		outline-color: var(--st-colors-primary7);
		outline-width: var(--st-outline-width);
	}
	:global(.st-theme-light a[data-active]) {
		outline-width: 0;
	}
	:global(.st-theme-light a[data-active]:focus-visible) {
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
	:global(.st-theme-light [part='tag']) {
		background-color: var(--st-colors-light3);
		color: var(--st-colors-gray4);
	}

	[part='menu-item'] {
		color: var(--st-colors-gray4);
	}
	:global(.st-theme-light [part='menu-item']) {
		color: var(--st-colors-gray9);
	}

	[part='menu-item'][data-active] {
		color: white;
		background-color: var(--st-colors-primary9);
	}
	:global(.st-theme-light [part='menu-item'][data-active]) {
		color: var(--st-colors-primary5);
		background-color: var(--st-colors-primary1);
	}

	[part='menu-item']:not([data-active]):not([data-disabled]):hover {
		background-color: var(--st-colors-primary9);
	}
	:global(.st-theme-light [part='menu-item']:not([data-active]):not([data-disabled]):hover) {
		background-color: var(--st-colors-primary1);
	}

	[part='menu-item'][data-disabled] {
		color: var(--st-colors-gray7);
	}
	:global(.st-theme-light [part='menu-item'][data-disabled]) {
		color: var(--st-colors-gray4);
	}
</style>
