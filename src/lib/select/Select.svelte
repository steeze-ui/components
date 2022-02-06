<script lang="ts">
	import FieldContainer from '$lib/core/parts/FieldContainer.svelte'
	import Floating from '$lib/core/parts/Floating.svelte'
	import Helper from '$lib/core/parts/Helper.svelte'
	import InputContainer from '$lib/core/parts/InputContainer.svelte'
	import Label from '$lib/core/parts/Label.svelte'
	import Portal from '$lib/core/parts/Portal.svelte'
	import type { FloatingPosition, SelectValue, SelectValueMap } from '$lib/core/types'
	import { getId } from '$lib/core/utils/id'
	import Item from '$lib/listbox/Item.svelte'
	import ListBox from '$lib/listbox/ListBox.svelte'
	import { ChevronDown, X } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import { createEventDispatcher, onMount } from 'svelte'

	type T = $$Generic

	export let identifier = 'id'
	export let items: T[] | SelectValueMap
	export let value: T | string = null
	//functionality
	export let groupBy: (e: T) => string = null
	export let searchable = false
	export let clearable = false
	export let loop = false
	//display
	export let label = null
	export let helper = null
	export let placeholder = null
	export let itemLabelRenderer = (e: T) => e?.['label'] ?? ''
	export let position: FloatingPosition = 'bottom-end'
	export let width: string = '12rem'
	//form
	export let disabled = false
	export let required = false
	// export let name = null
	export let focus = false
	export let theme = null

	let refTrigger: HTMLElement
	let refFloating: any
	let refInput: HTMLElement
	let refButton: HTMLElement

	let buttonId = getId()
	let itemsId = getId()
	let dispatch = createEventDispatcher()

	let focused = false
	// let refArrow: HTMLElement
	// let arrowX = 0
	// let arrowY = 0
	// let staticSide: string

	onMount(() => {
		if (focus) {
			refTrigger.focus()
		}
	})

	// create items Map from items
	interface ItemsMap {
		[group: string]: T[]
	}
	const itemsMap: ItemsMap = {}

	if (items.constructor.name === 'Object') {
		for (const id of Object.keys(items)) {
			const item = { ...items[id], [identifier]: id } as T
			const group = groupBy ? groupBy(item) : ''
			if (!itemsMap[group]) {
				itemsMap[group] = []
			}
			itemsMap[group].push(item)
		}
	} else {
		for (const item of items as T[]) {
			const group = groupBy ? groupBy(item) : ''
			if (!itemsMap[group]) {
				itemsMap[group] = []
			}
			itemsMap[group].push(item)
		}
	}

	if (value && typeof value === 'string') {
		for (const group of Object.keys(itemsMap)) {
			const item = itemsMap[group].find((e) => e[identifier] === value)
			if (item) {
				value = item
				break
			}
		}
	}

	// Value
	let shownValue: string
	$: selectorItems = !searchable ? itemsMap : getItemsBySearch(searchText)

	function getItemsBySearch(searchText: string): ItemsMap {
		const map: ItemsMap = {}
		for (const [group, items] of Object.entries(itemsMap)) {
			const found = items.filter((e) =>
				itemLabelRenderer(e).toLowerCase().includes(searchText.toLowerCase())
			)
			if (found.length > 0) {
				map[group] = found
			}
		}

		return map
	}

	$: isSelected = value != null
	$: {
		if (isSelected) {
			shownValue = itemLabelRenderer(value as T)
		} else {
			shownValue = ''
		}
	}

	// Search
	let searchText = ''
	$: {
		searchText
		focusedItemGroupIndex = 0
		focusedItemIndex = 0
	}

	// Selector
	let opened = false
	let lastCleared = false

	function openSelector() {
		if (!disabled) {
			if (opened) {
				closeSelector()
			} else {
				opened = true
				searchText = ''
				focusItem(0, 0)
				if (!focused) {
					refButton.focus()
				}
			}
		}
	}

	function closeSelector() {
		searchText = ''
		opened = false
	}

	function selectItem(item: T) {
		if (clearable && item?.[identifier] === value?.[identifier]) {
			value = null
		} else {
			value = item
		}
		dispatch('select', item)
		closeSelector()
	}

	export function clear() {
		value = null
		dispatch('select', null)
		lastCleared = true
	}

	// Focus
	let focusedItemAriaId
	let focusedItemGroupIndex = 0
	let focusedItemIndex = 0

	function focusItem(groupIndex: number, itemIndex: number) {
		focusedItemGroupIndex = groupIndex
		focusedItemIndex = itemIndex
		focusedItemAriaId = `${itemsId}-menu-item-${groupIndex}-${itemIndex}`
	}

	function focusNextItem() {
		const currentGroup = Object.keys(selectorItems)[focusedItemGroupIndex]
		const lenItems = selectorItems[currentGroup].length

		const nextItemIndex = focusedItemIndex + 1
		if (nextItemIndex >= lenItems) {
			if (focusedItemGroupIndex >= Object.keys(selectorItems).length - 1) {
				if (loop) {
					focusedItemGroupIndex = 0
					focusedItemIndex = 0
				}
			} else {
				focusedItemGroupIndex += 1
				focusedItemIndex = 0
			}
		} else {
			focusedItemIndex = nextItemIndex
		}
	}

	function focusPrevItem() {
		const prevItemIndex = focusedItemIndex - 1
		if (prevItemIndex >= 0) {
			focusedItemIndex = prevItemIndex
		} else {
			const prevGroupIndex = focusedItemGroupIndex - 1
			const lastItemIndex =
				selectorItems[Object.keys(selectorItems)[focusedItemGroupIndex]].length - 1
			if (prevGroupIndex >= 0) {
				focusedItemGroupIndex = prevGroupIndex
				focusedItemIndex = lastItemIndex
			} else {
				if (loop) {
					focusedItemGroupIndex = Object.keys(selectorItems).length - 1
					focusedItemIndex = lastItemIndex
				}
			}
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
					event.preventDefault()
					if (opened) {
						selectItem(
							selectorItems[Object.keys(selectorItems)[focusedItemGroupIndex]][focusedItemIndex]
						)
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
						selectItem(
							selectorItems[Object.keys(selectorItems)[focusedItemGroupIndex]][focusedItemIndex]
						)
						refTrigger?.focus()
					} else {
						openSelector()
					}
					break
				case 'Tab':
					closeSelector()

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
	$: opened && refTrigger && refFloating && refFloating.updatePosition()
</script>

<svelte:window
	on:keydown={handleKeydown}
	on:resize={() => {
		opened && refFloating.updatePosition()
	}}
	on:scroll={() => {
		opened && refFloating.updatePosition()
	}}
/>

<FieldContainer
	data-component="select"
	title={shownValue}
	{label}
	{helper}
	{width}
	{disabled}
	{focused}
	{theme}
	{...$$restProps}
	on:click={() => {
		if (lastCleared) {
			lastCleared = false
		}
		openSelector()
		refInput?.focus()
	}}
	bind:ref={refTrigger}
	on:focus
	data-expanded={opened ? '' : null}
>
	<svelte:fragment slot="label" let:htmlfor let:id>
		<slot name="label" {id} {htmlfor} />
	</svelte:fragment>

	<svelte:fragment slot="prefix">
		<slot name="prefix" />
	</svelte:fragment>

	<button
		slot="default"
		part="value"
		on:focus={() => {
			focused = true
		}}
		on:blur={() => {
			focused = false
		}}
		role="listbox"
		type="button"
		{disabled}
		{required}
		id={buttonId}
		aria-controls={itemsId}
		aria-haspopup="true"
		aria-expanded={opened ? true : false}
		bind:this={refButton}
	>
		{#if isSelected}
			<span>
				{shownValue}
			</span>
		{:else}
			<span part="placeholder">
				{placeholder || ''}
			</span>
		{/if}
	</button>

	<svelte:fragment slot="suffix">
		<slot name="suffix" />
		{#if isSelected && clearable}
			<button
				aria-label="clear value of the select"
				on:pointerdown={clear}
				part="clear-button"
				type="button"
			>
				<!-- Clear Icon -->
				<Icon src={X} size="16px" />
			</button>
		{:else}
			<button
				part="toggle-button"
				aria-label="toggle the selector open"
				tabindex="-1"
				type="button"
			>
				<!-- Select Icon -->
				<Icon src={ChevronDown} size="16px" />
			</button>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="helper" let:id let:htmlfor>
		<slot name="helper" {id} {htmlfor} />
	</svelte:fragment>
</FieldContainer>

<!-- Selector -->

{#if opened}
	<Portal>
		<Floating
			{position}
			clickOutsideEnabled
			trigger={refTrigger}
			bind:this={refFloating}
			clickOutsideCallback={closeSelector}
		>
			<ListBox
				id={itemsId}
				aria-labelledby={buttonId}
				aria-activedescendant={focusedItemAriaId}
				showPrefix={searchable}
			>
				<input
					part="search-field"
					slot="prefix"
					bind:this={refInput}
					bind:value={searchText}
					placeholder="Search.."
				/>

				{#each Object.keys(selectorItems) as group, groupIndex (group)}
					{#if groupBy}
						<span part="group-label">
							{group}
						</span>
					{/if}
					{#each selectorItems[group] as item, itemIndex (item[identifier])}
						{@const id = item[identifier]}
						{@const focused =
							groupIndex === focusedItemGroupIndex && itemIndex === focusedItemIndex}
						{@const selected = value?.[identifier] === id ?? false}
						{@const ariaId = `${itemsId}-menu-item-${groupIndex}-${itemIndex}`}
						{@const label = itemLabelRenderer(item)}

						<slot
							name="item"
							{id}
							{item}
							{label}
							{focused}
							{selected}
							onFocus={() => focusItem(groupIndex, itemIndex)}
							onSelect={() => selectItem(item)}
						>
							<Item
								id={ariaId}
								{selected}
								{focused}
								on:pointerover={() => {
									focusItem(groupIndex, itemIndex)
								}}
								on:pointerdown={() => selectItem(item)}
							>
								{itemLabelRenderer(item)}
							</Item>
						</slot>
					{/each}
				{/each}
			</ListBox>
		</Floating>
	</Portal>
{/if}

<style>
	:global([data-component='select'][data-expanded]) {
		--st-field-bg-color: var(--st-select-hover-bg-color);
	}

	:global([data-component='select']) {
		--st-field-hover-border-color: var(--st-field-border-color);
		--st-field-hover-bg-color: var(--st-select-hover-bg-color);
	}

	[part='value']:focus {
		outline: none;
	}

	[part='value'] {
		display: flex;
		flex: auto;
		background-color: transparent;
		font-size: var(--st-select-font-size, var(--st-field-font-size));
		font-weight: var(--st-select-font-weight, var(--st-field-font-weight));
		color: var(--st-select-color, var(--st-field-color));
		padding: 0 0.25rem;
		cursor: pointer;
		pointer-events: none;
		overflow: hidden;
	}

	[part='value'] span {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		/* width: 100%; */
	}

	[part='placeholder'] {
		color: var(--st-placeholder-text-color);
	}

	[part='clear-button'],
	[part='toggle-button'] {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: var(--st-select-button-size, var(--st-field-button-size));
		height: var(--st-select-button-size, var(--st-field-button-size));
		color: var(--st-select-button-color, var(--st-field-button-color));
		transition: var(--st-hover-transition);
		padding: 0;
		outline: none;
	}

	[part='group-label'] {
		color: var(--st-select-group-color, var(--st-item-group-color));
		font-size: var(--st-select-group-font-size, var(--st-font-size-xs));
		font-weight: var(--st-select-group-font-weight, var(--st-font-weight-medium));
		margin: var(--st-select-group-margin, 0 0 0 0.5rem);
	}

	[part='search-field'] {
		background-color: transparent;
		padding: 0.5rem;
		font-size: var(--st-select-search-font-size, var(--st-font-size-xs));
		font-weight: var(--st-select-search-font-weight, var(--st-font-weight-normal));
		color: var(--st-select-search-color, var(--st-field-color));
		outline: none;
	}
	[part='search-field']::placeholder {
		color: var(--st-placeholder-text-color);
	}
</style>
