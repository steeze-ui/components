<script lang="ts">
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

	export let identifier = 'id'
	export let items: SelectValue[] | SelectValueMap
	export let value: SelectValue | string = null
	//functionality
	export let groupBy: (e: SelectValue) => string = null
	export let searchable = false
	export let clearable = false
	export let loop = false
	//display
	export let label = ''
	export let helper = ''
	export let placeholder = ''
	export let itemLabelRenderer = (e: SelectValue) => e?.label ?? ''
	export let position: FloatingPosition = 'bottom-end'
	export let width: string = '12rem'
	//form
	export let disabled = false
	export let name = ''
	export let focus = false
	export let theme = ''

	let refTrigger: HTMLElement
	let refFloating: any
	let refInput: HTMLElement

	let buttonId = getId()
	let itemsId = getId()
	let dispatch = createEventDispatcher()

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
		[group: string]: SelectValue[]
	}
	const itemsMap: ItemsMap = {}

	if (items.constructor.name === 'Object') {
		for (const id of Object.keys(items)) {
			const item = { ...items[id], [identifier]: id } as SelectValue
			const group = groupBy ? groupBy(item) : ''
			if (!itemsMap[group]) {
				itemsMap[group] = []
			}
			itemsMap[group].push(item)
		}
	} else {
		for (const item of items as SelectValue[]) {
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
			shownValue = itemLabelRenderer(value as SelectValue)
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
			}
		}
	}

	function closeSelector() {
		searchText = ''
		opened = false
	}

	function selectItem(item: SelectValue) {
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
		if (document.activeElement.isSameNode(refInput)) {
			switch (event.key) {
				case 'ArrowUp':
					event.preventDefault()
					focusPrevItem()
					return
				case 'ArrowDown':
					event.preventDefault()
					focusNextItem()
					return
				case 'Enter':
					event.preventDefault()
					selectItem(
						selectorItems[Object.keys(selectorItems)[focusedItemGroupIndex]][focusedItemIndex]
					)
					return
			}
		}

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

<div part="select" style:width data-theme={theme} {...$$restProps}>
	<slot name="label">
		{#if label}
			<Label for={name}>{label}</Label>
		{/if}
	</slot>
	<InputContainer
		on:click={() => {
			if (lastCleared) {
				lastCleared = false
			}
			openSelector()
			refInput?.focus()
		}}
		bind:ref={refTrigger}
		{disabled}
		on:focus
		id={buttonId}
		role="button"
		tabindex={disabled ? '-1' : 0}
		aria-haspopup="true"
		aria-expanded={opened}
		data-expanded={opened}
		aria-controls={itemsId}
		{label}
		{name}
	>
		<slot name="prefix" />

		<div part="value-container">
			<input
				readonly
				tabindex="-1"
				aria-hidden="true"
				part="value"
				type="text"
				{placeholder}
				value={shownValue}
				{name}
				{disabled}
			/>

			{#if isSelected && clearable}
				<button
					aria-label="Clear Select"
					on:pointerdown={clearItem}
					part="clear-button"
					type="button"
				>
					<!-- Clear Icon -->
					<Icon src={X} size="9" />
				</button>
			{:else}
				<button part="toggle-button" tabindex="-1" type="button">
					<!-- Select Icon -->
					<Icon src={ChevronDown} size="9" />
				</button>
			{/if}
		</div>
	</InputContainer>
	<slot name="helper">
		{#if helper}
			<Helper>{helper}</Helper>
		{/if}
	</slot>
</div>

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
				<input slot="prefix" bind:this={refInput} bind:value={searchText} placeholder="Search.." />

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
	:global([part='select'] [part='input-field'][data-expanded='true'], [part='select']
			[part='input-field']:hover) {
		background-color: var(--st-colors-gray10);
	}

	[part='select'] {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	[part='value-container'] {
		height: 100%;
		width: 100%;
		display: flex;
		flex-grow: 1;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
	}
	[part='value'] {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: var(--st-select-font-size, var(--st-field-font-size));
		font-weight: var(--st-select-font-weight, var(--st-field-font-weight));
		color: var(--st-select-color, var(--st-field-color));
		padding: 0;
		cursor: pointer;
		pointer-events: none;
	}

	[part='clear-button'],
	[part='toggle-button'] {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		width: var(--st-icon-size-sm);
		height: var(--st-icon-size-sm);
		color: var(--st-select-toggle-color, var(--st-secondary-text-color));
		transition: var(--st-hover-transition);
		padding: 0;
		margin-left: 0.5rem;
		outline: none;
	}
	[part='clear-button']:focus-visible {
		outline: var(--st-outline-width) solid var(--st-outline-color);
	}
	[part='clear-button']:hover {
		background-color: var(
			--st-select-clear-hover-bg-color,
			var(--st-field-secondary-hover-bg-color)
		);
	}
	[part='clear-button'] {
		border-radius: var(--st-select-clear-border-radius, var(--st-border-radius-full));
		background-color: var(--st-select-clear-bg-color, var(--st-field-secondary-bg-color));
	}

	input {
		background-color: transparent;
		color: var(--st-select-search-text-color, var(--st-field-color));
		font-size: var(--st-select-search-font-size, var(--st-font-size-xs));
		padding: 0.5rem 1rem;
		outline: none;
	}

	input:focus {
		outline: none;
	}

	[part='group-label'] {
		color: var(--st-select-group-color, var(--st-item-group-color));
		font-size: var(--st-select-group-font-size, var(--st-font-size-xs));
		font-weight: var(--st-select-group-font-weight, var(--st-font-weight-medium));
		margin: var(--st-select-group-margin, 0 0 0 0.5rem);
	}
</style>
