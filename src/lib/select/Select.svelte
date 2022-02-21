<script lang="ts">
	import FieldContainer from '$lib/core/parts/FieldContainer.svelte'
	import Floating from '$lib/core/parts/Floating.svelte'
	import Portal from '$lib/core/parts/Portal.svelte'
	import type { FloatingPosition } from '$lib/core/types'
	import { getId } from '$lib/core/stores/id'
	import Item from '$lib/listbox/Item.svelte'
	import ListBox from '$lib/listbox/ListBox.svelte'
	import { ChevronDown, X } from '@steeze-ui/heroicons'
	import Icon from '@steeze-ui/svelte-icon/Icon.svelte'
	import { createEventDispatcher, onMount, tick } from 'svelte'

	type T = $$Generic

	interface $$Events {
		select: CustomEvent<T | T[]>
	}

	export let identifier = 'id'
	export let items: T[] = []
	export let value: (T[] | T | string) & { includes?: (item: T) => boolean } = null

	//functionality
	export let groupBy: (item: T) => string = null
	export let filterBy: (item: T, searchText: string) => boolean = null
	export let multiple = false
	export let searchable = false
	export let clearable = false
	export let taggable: (value: string) => T = null
	export let pushTags = false
	export let loop = false
	//display
	export let theme: string = null
	export let label: string = null
	export let helper: string = null
	export let placeholder: string = null
	export let emptyText = 'No options found'
	export let itemLabelRenderer = (e: T) => e?.['label'] ?? ''
	export let position: FloatingPosition = 'bottom-end'
	export let width: string = '12rem'
	export let retainOnSelect = false
	//form
	export let disabled = false
	export let focus = false
	// export let required = false
	// export let name = null

	let refTrigger: HTMLElement
	let refFloating: any
	let refInput: HTMLElement
	let refField: HTMLElement

	let buttonId = getId()
	let listboxId = getId()
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

	// init items
	interface ItemsMap {
		[group: string]: T[]
	}

	let itemsMap: ItemsMap
	$: {
		itemsMap = {}

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
	}

	// init value
	if (multiple) {
		if (value === null) {
			value = []
		} else if (items.constructor.name === 'Object') {
			value = [value as T]
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

	// Selector Items
	$: selectorItems = searchable && searchValue.length > 0 ? getItemsBySearch(searchValue) : itemsMap

	// Selector Search
	let searchValue = ''
	$: {
		//reset focused index when searchValue changes
		searchValue
		focusedItemGroupIndex = 0
		focusedItemIndex = 0
	}

	function getItemsBySearch(searchText: string): ItemsMap {
		const map: ItemsMap = {}
		for (const [group, items] of Object.entries(itemsMap)) {
			const found = items.filter((e) => {
				if (filterBy) {
					return filterBy(e, searchText)
				} else {
					return itemLabelRenderer(e).toLowerCase().includes(searchText.toLowerCase())
				}
			})
			if (found.length > 0) {
				map[group] = found
			}
		}

		if (taggable && searchText.length > 0) {
			const tag = taggable(searchText)

			map[''] = map[''] ? [tag, ...map['']] : [tag]
		}

		return map
	}

	// Selector Expanded
	let expanded = false
	let lastCleared = false

	function openSelector() {
		if (!disabled) {
			if (expanded) {
				closeSelector()
			} else {
				expanded = true
				focusItem(0, 0)
				if (!focused) {
					refInput.focus()
				}
			}
		}
	}

	function closeSelector() {
		searchValue = ''
		expanded = false
		refInput.blur()
	}

	// Value
	let singleValue: string
	let multiValue: string[] = []

	$: isSelected = multiple ? (value as T[]).length > 0 : value != null
	$: {
		if (multiple) {
			multiValue = (value as T[])?.map((e) => itemLabelRenderer(e)) ?? []
		} else {
			singleValue = isSelected ? itemLabelRenderer(value as T) : ''
		}
	}

	async function selectItem(item: T) {
		searchValue = ''
		if (pushTags && !items.includes(item)) {
			items = [...items, item]
		}

		if (multiple) {
			const exists = (value as T[])?.includes(item)
			if (!exists) {
				value = [...(value as T[]), item]
			}
			if (clearable && exists) {
				value = (value as T[]).filter((e) => e !== item)
			}
		} else {
			if (clearable && item?.[identifier] === value?.[identifier]) {
				value = null
			} else {
				value = item
			}
			dispatch('select', item)
		}
		if (!retainOnSelect) {
			closeSelector()
		} else {
			//keep focus in input field
			refInput.focus()
		}
	}

	export function clear() {
		if (multiple) {
			value = []
		} else {
			value = null
		}
		dispatch('select', value as T | T[])
		lastCleared = true
	}

	// Focus
	let focusedItemAriaId: string
	let focusedItemGroupIndex = 0
	let focusedItemIndex = 0

	function focusItem(groupIndex: number, itemIndex: number) {
		focusedItemGroupIndex = groupIndex
		focusedItemIndex = itemIndex
		focusedItemAriaId = `${listboxId}-menu-item-${groupIndex}-${itemIndex}`
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
					if (!expanded) {
						openSelector()
					} else {
						focusNextItem()
					}
					break
				case 'Enter':
					event.preventDefault()
					if (expanded) {
						const group = Object.keys(selectorItems)[focusedItemGroupIndex]
						if (group != undefined) {
							selectItem(selectorItems[group][focusedItemIndex])
						}
					} else {
						openSelector()
					}
					break
				case 'Escape':
					closeSelector()
					break
				case ' ':
					if (searchValue.length === 0) {
						event.preventDefault()
						if (expanded) {
							const group = Object.keys(selectorItems)[focusedItemGroupIndex]
							if (group != undefined) {
								selectItem(selectorItems[group][focusedItemIndex])
							}
						} else {
							openSelector()
						}
					}
					break
				case 'Tab':
					closeSelector()

				default:
					break
			}
		}
	}

	//* Position
	$: expanded && refTrigger && refFloating && refFloating.updatePosition()
</script>

<svelte:window
	on:keydown={handleKeydown}
	on:resize={() => {
		expanded && refFloating.updatePosition()
	}}
	on:scroll={() => {
		expanded && refFloating.updatePosition()
	}}
/>

<FieldContainer
	data-component="select"
	title={singleValue}
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
	}}
	bind:ref={refTrigger}
	{expanded}
	id={buttonId}
	aria-controls={listboxId}
	aria-haspopup="true"
	aria-expanded={expanded ? true : false}
	bind:refField
>
	<svelte:fragment slot="label" let:htmlfor let:id>
		<slot name="label" {id} {htmlfor} />
	</svelte:fragment>

	<svelte:fragment slot="prefix">
		<slot name="prefix" />
	</svelte:fragment>

	<div slot="default" part="value">
		{#if isSelected}
			{#if multiple}
				<div part="multiple-value">
					{#each multiValue ?? [] as item}
						<span part="selected" data-multiple-value>
							{item}
						</span>
					{/each}
				</div>
			{:else}
				<span part="selected" data-single-value>
					{singleValue}
				</span>
			{/if}
		{/if}

		<input
			bind:this={refInput}
			placeholder={isSelected ? null : placeholder}
			autocapitalize="none"
			autocomplete="off"
			autocorrect="off"
			spellcheck="false"
			type="text"
			aria-autocomplete="list"
			aria-expanded={expanded ? 'true' : 'false'}
			aria-haspopup="true"
			aria-controls={listboxId}
			aria-owns={listboxId}
			bind:value={searchValue}
			readonly={!searchable}
			on:focus={() => {
				focused = true
				if (!expanded) {
					openSelector()
				}
			}}
			on:blur={() => {
				focused = false
			}}
			on:input={() => {
				if (!expanded) {
					openSelector()
				}
			}}
		/>
	</div>

	<svelte:fragment slot="suffix">
		<slot name="suffix" />
		{#if isSelected && clearable}
			<button
				aria-label="clear value of the select"
				on:click={clear}
				part="clear-button"
				tabindex="-1"
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

{#if expanded}
	<Portal>
		<Floating
			{position}
			clickOutsideEnabled
			trigger={refTrigger}
			bind:this={refFloating}
			clickOutsideCallback={closeSelector}
		>
			<ListBox id={listboxId} aria-labelledby={buttonId} aria-activedescendant={focusedItemAriaId}>
				{#each Object.keys(selectorItems) as group, groupIndex (group)}
					{#if groupBy}
						<span part="group-label">
							{group}
						</span>
					{/if}
					{#each selectorItems[group] as item, itemIndex}
						{@const id = item[identifier]}
						{@const focused =
							groupIndex === focusedItemGroupIndex && itemIndex === focusedItemIndex}
						{@const selected = multiple
							? value.includes(item)
							: value?.[identifier] === id ?? false}
						{@const ariaId = `${listboxId}-menu-item-${groupIndex}-${itemIndex}`}
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
								on:click={() => selectItem(item)}
							>
								{itemLabelRenderer(item)}
							</Item>
						</slot>
					{/each}
				{:else}
					{#if !taggable}
						<span part="empty-text">{emptyText}</span>
					{/if}
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
		gap: 0.5rem;
		flex: auto;
		font-size: var(--st-select-font-size, var(--st-field-font-size));
		font-weight: var(--st-select-font-weight, var(--st-field-font-weight));
		color: var(--st-select-color, var(--st-field-color));
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

	input {
		color: var(--vs-search-input-color);
		appearance: none;
		line-height: var(--vs-line-height);
		font-size: var(--vs-font-size);
		border: 1px solid transparent;
		border-left: none;
		outline: none;
		background: none;
		box-shadow: none;
		width: 0;
		max-width: 100%;
		flex-grow: 1;
		z-index: 1;
	}

	input::placeholder {
		color: var(--st-placeholder-text-color);
	}

	[part='empty-text'] {
		font-size: var(--st-item-font-size, var(--st-field-font-size));
		font-weight: var(--st-item-font-weight, var(--st-field-font-weight));
		color: var(--st-item-text-color, var(--st-body-text-color));
		padding: var(--st-item-padding, 0.2rem 0.75rem 0.2rem 0.5rem);
	}
</style>
