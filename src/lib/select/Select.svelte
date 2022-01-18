<script lang="ts">
	import { clickOutside } from '$lib/core/actions/clickOutside'
	import { portal } from '$lib/core/actions/portal'
	import InputContainer from '$lib/core/primitives/InputContainer.svelte'

	import type { FloatingPosition, SelectValue, SelectValueMap } from '$lib/core/types'
	import { getId } from '$lib/core/utils/id'

	import { arrow, computePosition, flip, offset, shift, size } from '@floating-ui/dom'
	import { Check, ChevronDown, X } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { createEventDispatcher, onMount } from 'svelte'
	import { scale } from 'svelte/transition'

	export let items: SelectValue[] | SelectValueMap
	export let value: SelectValue = null
	export let placeholder = ''
	export let focus = false
	export let searchable = false
	export let clearable = false
	export let position: FloatingPosition = 'bottom-end'
	export let width: string = '100%'
	export let identifier = 'id'
	export let itemLabelRenderer = (e: SelectValue) => e?.label ?? ''

	let refTrigger: HTMLElement
	let refContent: HTMLElement
	let refInput: HTMLElement

	let buttonId = getId()
	let itemsId = getId()
	let dispatch = createEventDispatcher()

	let floatingX = 0
	let floatingY = 0

	// let refArrow: HTMLElement
	// let arrowX = 0
	// let arrowY = 0
	// let staticSide: string

	onMount(() => {
		if (focus) {
			refTrigger.focus()
		}
	})

	//itemsmap to items
	if (items.constructor.name === 'Object') {
		const itemsMap = items
		items = Object.keys(itemsMap).map((item) => ({
			...itemsMap[item],
			[identifier]: item
		}))
	}

	if (typeof value === 'string') {
		value = (items as SelectValue[]).find((e) => e[identifier] === value)
	}

	// Value
	let shownValue: string
	$: selectorItems = !searchable
		? (items as SelectValue[])
		: (items as SelectValue[]).filter((e) =>
				itemLabelRenderer(e).toLowerCase().includes(searchText.toLowerCase())
		  )
	let selectedItemIndex: number
	$: isSelected = value != null
	$: {
		if (isSelected) {
			selectedItemIndex = selectorItems.indexOf(
				selectorItems.find((e) => e[identifier] === value[identifier])
			)
			shownValue = itemLabelRenderer(value)
		} else {
			shownValue = placeholder
			selectedItemIndex = -1
		}
	}

	$: console.log({ selectedItemIndex })

	// Search
	let searchText = ''

	// Selector
	let opened = false
	let lastCleared = false

	function openSelector() {
		if (opened) {
			closeSelector()
		} else {
			opened = true
			focusItem(0)
		}
	}

	function closeSelector() {
		searchText = ''
		opened = false
	}

	function selectItem(item: SelectValue) {
		console.log('select', { item, value })

		if (clearable && item?.[identifier] === value?.[identifier]) {
			value = null
		} else {
			value = item
		}
		dispatch('select', item)
		closeSelector()
	}

	function clearItem() {
		value = null
		dispatch('select', null)
		lastCleared = true
	}

	// Focus
	let focusedItemIndex = 0
	$: focusedItemId = `${itemsId}-menu-item-${focusedItemIndex}`

	function focusItem(index: number) {
		focusedItemIndex = index
	}

	function focusNextItem() {
		const next = focusedItemIndex + 1
		if (next >= selectorItems.length) {
			focusedItemIndex = 0
		} else {
			focusedItemIndex = next
		}
	}

	function focusPrevItem() {
		const prev = focusedItemIndex - 1
		if (prev < 0) {
			focusedItemIndex = selectorItems.length - 1
		} else {
			focusedItemIndex = prev
		}
	}

	// Key Events
	function handleKeydown(event: KeyboardEvent) {
		if (refTrigger.contains(document.activeElement)) {
			switch (event.key) {
				case 'ArrowUp':
					event.preventDefault()
					focusPrevItem()
					break
				case 'ArrowDown':
					event.preventDefault()
					if (!opened) {
						openSelector()
					} else {
						focusNextItem()
					}
					break
				case 'Enter':
					if (opened) {
						selectItem(selectorItems[focusedItemIndex])
						refTrigger?.focus()
					} else {
						openSelector()
					}
					break
				case 'Escape':
					closeSelector()
					break
				case ' ':
					event.preventDefault()
					if (opened) {
						selectItem(selectorItems[focusedItemIndex])
						refTrigger?.focus()
					} else {
						openSelector()
					}
					break
				default:
					refInput?.focus()
					break
			}
		} else {
			if (event.key === 'Tab') {
				closeSelector()
			}
		}
	}

	//* Position
	$: opened && refTrigger && refContent && updatePosition()

	export async function updatePosition() {
		const {
			x,
			y,
			middlewareData,
			placement: pl
		} = await computePosition(refTrigger, refContent, {
			placement: position,
			middleware: [
				flip(),
				shift(),
				// arrow({ element: refArrow }),
				offset(5),
				size({
					apply({ width, height }) {
						Object.assign(refContent.style, {
							maxWidth: `${width}px`,
							maxHeight: `${height}px`
						})
					}
				})
			]
		})

		floatingX = x
		floatingY = y

		// staticSide = {
		// 	top: 'bottom',
		// 	right: 'left',
		// 	bottom: 'top',
		// 	left: 'right'
		// }[pl.split('-')[0]]

		// arrowX = middlewareData.arrow.x
		// arrowY = middlewareData.arrow.y
	}
</script>

<svelte:window
	on:keydown={handleKeydown}
	on:resize={() => {
		opened && updatePosition()
	}}
	on:scroll={() => {
		opened && updatePosition()
	}}
/>

<InputContainer
	on:click={() => {
		if (lastCleared) {
			lastCleared = false
		}
		openSelector()
		refInput?.focus()
	}}
	bind:ref={refTrigger}
	on:focus
	id={buttonId}
	role="button"
	tabindex="0"
	aria-haspopup="true"
	aria-expanded={opened}
	aria-controls={itemsId}
	style="width:{width}"
>
	<slot name="prefix" />

	<div part="value-container">
		<!-- Value -->
		<span part="value" selected={isSelected}>
			{shownValue}
		</span>
		{#if isSelected && clearable}
			<button aria-label="Clear Select" on:pointerdown={clearItem} part="clear-button">
				<!-- Clear Icon -->
				<Icon src={X} size="9" />
			</button>
		{:else}
			<button data-active={opened} part="toggle-button">
				<!-- Select Icon -->
				<Icon src={ChevronDown} size="9" />
			</button>
		{/if}
	</div>
</InputContainer>

<!-- Selector -->
{#if opened}
	<div
		use:portal
		data-steeze-portal
		style="position: absolute; top: 0px; left: 0px; z-index: 2147483647;"
	>
		<div
			data-steeze-overlay-content-wrapper
			style="position: absolute; min-width: max-content; will-change: transform;"
			style:top="{floatingY}px"
			style:left="{floatingX}px"
			in:scale={{ start: 0.9, duration: 125, opacity: 0.6 }}
			bind:this={refContent}
			use:clickOutside={{
				cb: () => {
					closeSelector()
				},
				enabled: true,
				exclude: [refTrigger]
			}}
		>
			<div
				id={itemsId}
				aria-labelledby={buttonId}
				aria-activedescendant={focusedItemId}
				part="overlay"
				role="menu"
				aria-orientation="vertical"
				tabindex="-1"
			>
				<!-- Search Input -->
				{#if searchable}
					<input bind:this={refInput} bind:value={searchText} placeholder="Search.." />
				{/if}
				<ul part="menu-items">
					{#each selectorItems as item, i (item?.[identifier])}
						{@const focused = focusedItemIndex === i}
						{@const selected = selectedItemIndex === i}
						{@const id = `${itemsId}-menu-item-${i}`}
						{@const label = itemLabelRenderer(item)}
						<slot
							name="item"
							{id}
							{item}
							{label}
							{focused}
							{selected}
							onFocus={() => focusItem(i)}
							onSelect={() => selectItem(item)}
						>
							<li
								{id}
								part="menu-item"
								role="menuitem"
								aria-checked={selected}
								data-focused={focused}
								tabindex={focused ? 0 : -1}
								on:pointerover={() => {
									focusItem(i)
								}}
								on:pointerdown={() => selectItem(item)}
							>
								<div part="selected-icon">
									{#if selected}
										<Icon size="16px" src={Check} />
									{/if}
								</div>
								<span>{itemLabelRenderer(item)}</span>
							</li>
						</slot>
					{/each}
				</ul>
			</div>
		</div>
	</div>
{/if}

<style>
	[part='value-container'] {
		height: 100%;
		width: 100%;
		display: flex;
		flex-grow: 1;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
		padding: 0 0.5rem;
		padding-right: 0.33rem;
	}
	[part='value'] {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: var(--st-text-field-font-size);
		font-weight: var(--st-text-field-font-weight);
		color: var(--st-text-field-placeholder-color);
	}
	[part='value'][selected='true'] {
		color: var(--st-text-field-color);
	}
	[part='clear-button'],
	[part='toggle-button'] {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: var(--st-icon-size-sm);
		height: var(--st-icon-size-sm);
		color: var(--st-secondary-text-color);
		transition: var(--st-hover-transition);
		padding: 0;
		margin-left: 0.5rem;
		outline: none;
	}
	[part='clear-button']:focus-visible,
	[part='toggle-button']:focus-visible {
		outline: var(--st-outline-width) solid var(--st-outline-color);
	}
	[part='clear-button']:hover,
	[part='toggle-button']:hover,
	[part='toggle-button'][data-active='true'] {
		background-color: var(--st-text-field-button-hover-bg-color);
	}
	[part='clear-button'] {
		border-radius: var(--st-border-radius-full);
		background-color: var(--st-text-field-button-bg-color);
	}
	[part='toggle-button'] {
		border-radius: var(--st-border-radius-sm);
	}

	/* Overlay */
	[part='overlay'] {
		overflow: auto;
		box-shadow: var(--st-overlay-box-shadow);
		border: var(--st-overlay-border-width) solid var(--st-overlay-border-color);
		background-color: var(--st-overlay-bg-color);
		border-radius: var(--st-overlay-border-radius);
		padding: 0.25rem;
	}

	[part='overlay'] input {
		--st-overlay-search-font-size: var(--st-font-size-xs);
		--st-overlay-search-text-color: var(--st-text-field-color);

		background-color: transparent;
		color: var(--st-overlay-search-text-color);
		font-size: var(--st-overlay-search-font-size);
		padding: 0.5rem 1rem;
		outline: none;
	}
	[part='overlay'] input:focus {
		outline: none;
	}

	[part='menu-items'] {
		overflow: auto;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	[part='menu-item'] {
		display: flex;
		align-items: center;
		border-radius: var(--st-item-border-radius);
		background-color: var(--st-item-bg-color);
		font-size: var(--st-item-font-size);
		font-weight: var(--st-item-font-weight);
		color: var(--st-item-text-color);
		cursor: pointer;
		padding: var(--st-item-padding);
		gap: 0.25rem;
	}
	[part='menu-item'][data-focused='true'] {
		background-color: var(--st-item-active-bg-color);
		color: var(--st-item-active-text-color);
	}
	[part='selected-icon'] {
		width: 1rem;
		height: 1rem;
		color: var(--st-item-icon-color);
	}
	[part='menu-item'][data-focused='true'] [part='selected-icon'] {
		color: var(--st-item-active-icon-color);
	}
</style>
