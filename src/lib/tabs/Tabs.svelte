<script lang="ts">
	import { getId } from '$lib/core/stores/id'
	import { createEventDispatcher } from 'svelte'
	import { crossfade, scale } from 'svelte/transition'

	interface Tab {
		title: string
		[key: string]: string
	}

	export let items: Tab[]
	export let selected = 0
	export let theme = null

	const tabsId = getId()

	const dispatch = createEventDispatcher()

	const [send, receive] = crossfade({
		duration: 200,
		fallback: scale
	})

	function setSelected(index: number) {
		selected = index
		dispatch('selectedChange', items[index])
		dispatch('selectedIndexChange', index)
	}

	const refs = []

	// Key Events
	function handleKeydown(event: KeyboardEvent) {
		if (refs.includes(document.activeElement)) {
			const index = refs.indexOf(document.activeElement)
			switch (event.key) {
				case 'ArrowLeft':
					event.preventDefault()

					let prevIndex = index - 1

					if (prevIndex < 0) {
						prevIndex = refs.length - 1
					}

					refs[prevIndex].focus()

					break
				case 'ArrowRight':
					event.preventDefault()

					let next = index + 1

					if (next > refs.length - 1) {
						next = 0
					}

					refs[next].focus()

					break
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div
	data-component="tabs"
	role="tablist"
	dir="ltr"
	aria-orientation="horizontal"
	data-theme={theme}
	{...$$restProps}
>
	{#each items as item, i}
		{@const isActive = i === selected}
		{@const tabindex = isActive ? 0 : -1}
		{@const id = `${tabsId}-trigger-tab${i}`}
		<slot name="tab" {isActive} {id} {item} setSelected={() => setSelected(i)}>
			<button
				part="tab"
				type="button"
				role="tab"
				data-active={isActive ? true : null}
				aria-label="{item} Tab"
				on:click={() => setSelected(i)}
				aria-selected={isActive}
				{id}
				{tabindex}
				data-orientation="horizontal"
				bind:this={refs[i]}
			>
				{item.title}
				{#if isActive}
					<div part="line" in:receive={{ key: 'tab-active' }} out:send={{ key: 'tab-active' }} />
				{:else}
					<div part="line" />
				{/if}
			</button>
		</slot>
	{/each}
</div>

<style>
	/* Tabs */
	[data-component] {
		--sti-tab-line-width: var(--st-tab-line-width, 2px);
		--sti-tabs-line-width: var(--st-tabs-line-width, 1px);

		display: flex;
		gap: var(--st-tabs-gap, 2rem);
		border-bottom: var(--sti-tabs-line-width) solid var(--st-tabs-line-color, transparent);
		width: fit-content;
	}

	/* Tab */
	[part='tab'] {
		position: relative;
		outline: none;
		padding: var(--st-tab-padding, 0.5rem 0);
		color: var(--st-tab-color, var(--st-body-text-color));
		font-weight: var(--st-tab-font-weight, var(--st-font-weight-medium));
		border-radius: var(--st-tab-border-radius, var(--st-border-radius-sm));
		background-color: var(--st-tab-bg-color, transparent);
	}

	[part='line'] {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: var(--sti-tab-line-width);
	}

	/* Hover */
	[part='tab']:not([data-active]):hover [part='line'] {
		background-color: var(--st-tab-line-hover-color, var(--st-tabs-border-color));
	}
	/* Focus */
	[part='tab']:focus-visible {
		outline: var(--st-outline-width) solid var(--st-outline-color);
	}
	/* Active */
	[data-active][part='tab'] {
		--st-tab-color: var(--st-tab-active-color, var(--st-primary-color));
	}
	[data-active] [part='line'] {
		background-color: var(--st-tab-line-active-color, var(--st-colors-primary4));
	}

	/* Themes */
	[data-theme*='line'] {
		border-bottom-color: var(--st-tabs-line-color, var(--st-tabs-border-color));
	}
</style>
