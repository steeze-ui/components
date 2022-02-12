<script lang="ts">
	import { getId } from '$lib/core/utils/id'
	import { crossfade, scale } from 'svelte/transition'
	import Table, { type TableData } from './Table.svelte'

	export let data: { [section: string]: TableData } = {}

	const id = getId()

	let index = 0

	$: sections = Object.keys(data)

	$: current = data[sections?.[index]] ?? []

	const [send, receive] = crossfade({
		duration: 200,
		fallback: scale
	})
</script>

<div
	part="tabs"
	style="outline: none;"
	role="tablist"
	dir="ltr"
	aria-label="Manage your account"
	tabindex="0"
	aria-orientation="horizontal"
	data-orientation="horizontal"
>
	{#each sections as section, i}
		{@const isActive = i === index}
		<button
			part="tab"
			type="button"
			role="tab"
			data-active={isActive ? true : null}
			aria-label="{section} Tab"
			on:click={() => (index = i)}
			aria-selected={isActive}
			id="{id}-trigger-tab{i}"
			tabindex={isActive ? 0 : -1}
			data-orientation="horizontal"
		>
			<div part="wrapper">{section}</div>
			{#if isActive}
				<div part="line" in:receive={{ key: 'tab-active' }} out:send={{ key: 'tab-active' }} />
			{/if}
		</button>
	{/each}
</div>

<Table data={current} />

<style>
	[part='tab']:not([data-active]) {
		border-bottom-width: 2px;
		border-bottom-style: solid;
		border-bottom-color: transparent;
	}
	[part='tab'] {
		position: relative;
	}

	[part='tabs'] {
		display: flex;
		gap: 2rem;
		border-bottom: 1px solid var(--st-colors-gray10);
		width: fit-content;
	}
	:global(.st-theme-light [part='tabs']) {
		border-color: var(--st-colors-light8) !important;
	}

	[part='wrapper'] {
		padding: 1rem 0;
		font-weight: var(--st-font-weight-medium);
		border-bottom-width: 2px;
		border-bottom-style: solid;
		border-bottom-color: transparent;
	}
	:global(.st-theme-light [part='wrapper']) {
		color: var(--st-colors-dark1);
	}

	[part='line'] {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
	}

	[part='tab']:not([data-active]):hover {
		border-color: var(--st-colors-gray9);
	}
	:global(.st-theme-light [part='tab']:hover) {
		border-color: var(--st-colors-light10) !important;
	}

	/* Active */
	[data-active] [part='wrapper'] {
		color: var(--st-colors-primary3);
	}
	[data-active] [part='line'] {
		background-color: var(--st-colors-primary4);
	}
</style>
