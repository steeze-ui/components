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
	role="tablist"
	aria-orientation="horizontal"
	dir="ltr"
	aria-label="Manage your account"
	tabindex="0"
	data-orientation="horizontal"
	style="outline: none;"
>
	{#each sections as section, i}
		{@const isActive = i === index}
		<div part="wrapper" data-active={isActive ? true : null}>
			<button
				part="tab"
				on:click={() => (index = i)}
				type="button"
				role="tab"
				aria-selected={isActive}
				aria-controls="steeze-{id}-content-tab{i}"
				id="steeze-{id}-trigger-tab{i}"
				tabindex={isActive ? 0 : -1}
				data-orientation="horizontal">{section}</button
			>
			{#if isActive}
				<div part="line" in:receive={{ key: 'tab-active' }} out:send={{ key: 'tab-active' }} />
			{/if}
		</div>
	{/each}
</div>

<Table data={current} />

<style>
	[part='wrapper']:not([data-active]) {
		border-bottom-width: 2px;
		border-bottom-style: solid;
		border-bottom-color: transparent;
	}
	[part='wrapper'] {
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

	[part='tab'] {
		padding: 1rem 0;
		font-weight: var(--st-font-weight-medium);
		border-bottom-width: 2px;
		border-bottom-style: solid;
		border-bottom-color: transparent;
	}
	:global(.st-theme-light [part='tab']) {
		color: var(--st-colors-dark1);
	}

	[part='line'] {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
	}

	[part='wrapper']:not([data-active]):hover {
		border-color: var(--st-colors-gray9);
	}
	:global(.st-theme-light [part='wrapper']:hover) {
		border-color: var(--st-colors-light10) !important;
	}

	/* Active */
	[data-active] [part='tab'] {
		color: var(--st-colors-primary4);
	}
	[data-active] [part='line'] {
		background-color: var(--st-colors-primary4);
	}
</style>
