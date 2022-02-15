<script lang="ts">
	import { getId } from '$lib/core/stores/id'
	import { crossfade, scale } from 'svelte/transition'
	import { createEventDispatcher } from 'svelte'

	interface Tab {
		title: string
		[key: string]: string
	}

	export let items: Tab[]
	export let selected = 0

	const tabsId = getId()

	const dispatch = createEventDispatcher()

	const [send, receive] = crossfade({
		duration: 200,
		fallback: scale
	})

	function setSelected(index) {
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

<div data-component="tabs" role="tablist" dir="ltr" aria-orientation="horizontal" {...$$restProps}>
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
				<div part="wrapper">{item.title}</div>
				{#if isActive}
					<div part="line" in:receive={{ key: 'tab-active' }} out:send={{ key: 'tab-active' }} />
				{/if}
			</button>
		</slot>
	{/each}
</div>

<style>
	[part='tab']:not([data-active]) {
		border-bottom-width: 2px;
		border-bottom-style: solid;
		border-bottom-color: transparent;
	}
	[part='tab'] {
		position: relative;
		outline: none;
		border-radius: var(--st-border-radius-sm);
	}
	[part='tab']:focus-visible {
		outline: var(--st-outline-width) solid var(--st-outline-color);
	}

	[data-component='tabs'] {
		display: flex;
		gap: 2rem;
		/* border-bottom: 1px solid var(--st-colors-gray10); */
		width: fit-content;
	}
	/* :global(.light [part='tabs']) {
		border-color: var(--st-colors-light8) !important;
	} */

	[part='wrapper'] {
		padding: 0.5rem 0;
		font-weight: var(--st-font-weight-medium);
		border-bottom-width: 2px;
		border-bottom-style: solid;
		border-bottom-color: transparent;
	}
	:global(.light [part='wrapper']) {
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
		border-color: var(--st-tabs-hover-border-color, var(--st-colors-gray9));
	}
	:global(.light [part='tab']:hover) {
		border-color: var(--st-colors-light10) !important;
	}

	/* Active */
	[data-active] [part='wrapper'] {
		color: var(--st-tabs-active-color, var(--st-colors-primary3));
	}
	[data-active] [part='line'] {
		background-color: var(--st-tabs-active-line-color, var(--st-colors-primary4));
	}
</style>
