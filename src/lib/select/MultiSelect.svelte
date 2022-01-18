<script lang="ts">
	import { clickOutside } from '$utils/actions/clickOutside'
	import { portal } from '$utils/actions/portal'
	import { arrow, computePosition, flip, offset, shift, size } from '@floating-ui/dom'
	import { Check, ChevronDown, Fire, X } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'
	import type { IconSource } from '@steeze-ui/svelte-icon/types'
	import { css } from '$stitches'
	import { createEventDispatcher, onMount } from 'svelte'
	import { fly, scale } from 'svelte/transition'

	export let label = 'Select'
	export let icon: IconSource = Fire
	export let selectedItems: Value[] = []
	export let selectedItemsMap: { id: number }[] = []
	export let items: Value[] = []
	export let isSearchable = false
	export let isClearable = false
	export let groupBy: (item: Value) => string = null
	export let position: SelectPosition = 'bottom'
	export let focusOnMount = false

	console.log({ selectedItemsMap, items })

	type SelectPosition =
		| 'top'
		| 'bottom'
		| 'left'
		| 'right'
		| 'top-start'
		| 'top-end'
		| 'bottom-start'
		| 'bottom-end'
		| 'left-start'
		| 'left-end'
		| 'right-start'
		| 'right-end'

	interface Value {
		label: string
		icon?: any
		[key: string]: any
	}

	let refTrigger: HTMLElement
	let refContent: HTMLElement
	let inputRef: HTMLElement
	let refArrow: HTMLElement

	let buttonId = `${label}-select-button`
	let itemsId = `${label}-select-items`
	let dispatch = createEventDispatcher()

	let floatingX = 0
	let floatingY = 0

	let arrowX = 0
	let arrowY = 0
	let staticSide: string

	onMount(() => {
		if (focusOnMount) {
			refTrigger.focus()
		}
	})

	if (selectedItemsMap) {
		selectedItems = selectedItemsMap.map((item) => {
			const index = items.findIndex((e) => e.id === item.id)
			return items[index]
		})
	}

	// Value
	$: selectorItems = groupBy
		? !isSearchable
			? items.sort((a, b) => (groupBy(a) > groupBy(b) ? 1 : -1))
			: items
					.filter((e) => e.label.toLowerCase().includes(searchText.toLowerCase()))
					.sort((a, b) => (groupBy(a) > groupBy(b) ? 1 : -1))
		: !isSearchable
		? items
		: items.filter((e) => e.label.toLowerCase().includes(searchText.toLowerCase()))

	// Search
	let searchText = ''

	// Selector
	let opened = false

	export function openSelector() {
		if (opened) {
			closeSelector()
		} else {
			opened = true
			focusItem(0)
		}
	}

	export function closeSelector() {
		searchText = ''
		opened = false
	}

	function selectItem(item: Value) {
		if (selectedItems.some((e) => e.id === item.id)) {
			//deselect
			removeItem(item)
		} else {
			//select
			addItem(item)
		}
		updatePosition()
	}

	function addItem(item: Value) {
		selectedItems = [...selectedItems, item]
		dispatch('select', selectedItems)
	}

	function removeItem(item: Value) {
		selectedItems = selectedItems.filter((e) => e.id != item.id)
		dispatch('select', selectedItems)
	}

	function clearItems() {
		selectedItems = []
		dispatch('select', selectedItems)
	}

	// Focus
	let focusedItemIndex = 0
	$: focusedItemId = `${label}-select-item-${focusedItemIndex}`

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
		if (document.activeElement === refTrigger || document.activeElement === inputRef) {
			switch (event.key) {
				case 'ArrowUp':
					focusPrevItem()
					break
				case 'ArrowDown':
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
					if (opened) {
						selectItem(selectorItems[focusedItemIndex])
						refTrigger?.focus()
					} else {
						openSelector()
					}
					break
				default:
					inputRef?.focus()
					break
			}
		} else {
			if (event.key === 'Tab') {
				closeSelector()
			}
		}
	}

	//* Position
	$: opened && refContent && refArrow && updatePosition()

	export async function updatePosition() {
		const {
			x,
			y,
			middlewareData,
			placement: pl,
		} = await computePosition(refTrigger, refContent, {
			placement: position,
			middleware: [
				flip(),
				shift(),
				arrow({ element: refArrow }),
				offset(5),
				size({
					apply({ width, height }) {
						Object.assign(refContent.style, {
							maxWidth: `${width}px`,
							maxHeight: `${height}px`,
						})
					},
				}),
			],
		})

		staticSide = {
			top: 'bottom',
			right: 'left',
			bottom: 'top',
			left: 'right',
		}[pl.split('-')[0]]

		floatingX = x
		floatingY = y

		arrowX = middlewareData.arrow.x
		arrowY = middlewareData.arrow.y
	}
</script>

<svelte:window
	on:keydown={handleKeydown}
	on:resize={() => {
		opened && updatePosition()
	}}
/>

<div
	id={buttonId}
	role="button"
	tabindex="0"
	aria-haspopup="true"
	aria-expanded={opened}
	aria-controls={itemsId}
	bind:this={refTrigger}
	on:click={() => {
		openSelector()
		inputRef?.focus()
	}}
	style="display:flex; align-items: center; position: relative; overflow: hidden; outline-none"
	class={css({
		border: '1px solid $dark300',
		minHeight: '$formHeight',
		borderRadius: '$default',
		'&:focus': { outline: 'none' },
		'&:focus-visible': {
			boxShadow: '$focus',
		},
	})()}
>
	{#if icon}
		<!-- Start Icon -->
		<span
			style="height:100%;display:flex; align-items: center;"
			class={css({
				color: '$gray500',
				borderRight: '1px solid $dark200',
				fontSize: '$sm',
				px: 1.5,
				variants: {
					selected: {
						true: {
							color: '$gray300',
						},
					},
				},
			})({ selected: selectedItems.length > 0 })}
		>
			<Icon src={icon} size="16" />
		</span>
	{/if}
	<div
		part="select-label"
		class={css({ backgroundColor: '$dark600' })()}
		style="height:100%; width: 100%; display: flex;flex-grow: 1; justify-content: space-between; align-items: center; overflow: hidden; padding: 0 0.5rem; padding-right:0.33rem"
	>
		{#if selectedItems.length == 0}
			<p
				class={css({
					fontSize: '$sm',
					color: '$gray400',
				})()}
				style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis"
			>
				{label}
			</p>
		{:else}
			<!-- Labels -->
			<div
				style="height: 100%; display: flex; flex-wrap:wrap; flex-grow: 1; gap:0.25rem; padding: 0.2rem"
			>
				{#each selectedItems as selectedItem}
					<div
						style="display:flex; flex-shrink:0; align-items: center;"
						class={css({
							border: '1px solid $dark200',
							backgroundColor: '$dark300',
							borderRadius: '$sm',
							height: '1.25rem',
							padding: '0 0.25rem',
							gap: '0.125rem',
							boxShadow: '$default',
						})()}
					>
						{#if selectedItem?.icon}
							<Icon src={selectedItem.icon} size="14" class="text-gray-400" />
						{/if}

						<span class={css({ color: '$gray200', fontSize: '$xs' })()}>
							{selectedItem?.label}
						</span>
					</div>
				{/each}
			</div>
		{/if}
		{#if selectedItems.length > 0 && isClearable}
			<button
				aria-label="Clear Select"
				on:pointerdown={clearItems}
				style="display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
				class={css({
					color: '$gray400',
					borderRadius: '$full',
					backgroundColor: '$dark300',
					width: '16px',
					height: '16px',
					ml: 2,
					padding: '0',
					transition: '$hover',
					'&hover': { backgroundColor: '$dark200' },
				})()}
			>
				<!-- Select Icon -->
				<Icon src={X} size="8" />
			</button>
		{:else}
			<div
				style="display: flex; align-items: center; justify-content: center; flex-shrink: 0;"
				class={css({
					color: '$gray400',
					borderRadius: '$default',
					size: 4,
					padding: '0',
					ml: 1,
					transition: '$hover',
					'&hover': { backgroundColor: '$dark300' },
					variants: {
						opened: {
							true: {
								backgroundColor: '$dark300',
							},
						},
					},
				})({ opened })}
			>
				<!-- Select Icon -->
				<Icon src={ChevronDown} size="8" />
			</div>
		{/if}
	</div>
</div>

{#if opened}
	<div
		use:clickOutside={{
			cb: () => {
				closeSelector()
			},
			enabled: true,
			exclude: [refTrigger],
		}}
		on:click={(e) => {
			e.stopPropagation()
		}}
		bind:this={refContent}
		use:portal
		part="content"
		id={itemsId}
		aria-labelledby={buttonId}
		aria-activedescendant={focusedItemId}
		role="button"
		tabindex="0"
		in:scale={{ start: 0.9, duration: 125, opacity: 0.6 }}
		style="position:absolute;left:{floatingX}px;top:{floatingY}px; overflow:auto"
		class={css({
			boxShadow: '$lg',
			border: '1px solid $dark300',
			bg: '$dark500',
			borderRadius: '$default',
			outline: 'none',
			p: 1,
			zIndex: 50,
			'&focus': {
				outline: 'none',
				boxShadow: '$focus',
			},
		})()}
	>
		<div style="display:flex; flex-direction:column; overflow: auto; height:100%">
			{#if isSearchable}
				<div>
					<input
						bind:this={inputRef}
						bind:value={searchText}
						placeholder="Search {label}.."
						class={css({
							bg: 'transparent',
							color: 'white',
							fontSize: '$xs',
							py: 2,
							px: 4,
							outline: 'none',
							'&focus': {
								outline: 'none',
							},
						})()}
					/>
				</div>
			{/if}
			<div style="display:flex; flex-direction: column; overflow:auto; height:100%">
				{#each selectorItems as item, i (item?.label)}
					<div>
						{#if groupBy && (i === 0 || selectorItems?.[i - 1]?.group != item?.group)}
							<span
								class={css({
									fontWeight: '$medium',
									fontSize: '$sm',
									color: '$gray500',
									mt: 1,
									ml: 6,
								})()}
							>
								{item.group}
							</span>
						{/if}
						<div
							on:click={() => selectItem(item)}
							role="menuitem"
							id={focusedItemId}
							tabindex={focusedItemIndex === i ? 0 : -1}
							on:pointerover={() => {
								focusItem(i)
							}}
							class={css({
								py: 0.75,
								pr: 3,
								pl: 4,
								gap: 1,
								bg: 'transparent',
								borderRadius: '$default',
								cursor: 'pointer',
								outline: 'none',
								'&focus': {
									outline: 'none',
								},
								variants: {
									focused: {
										true: {
											bg: '$dark300',
										},
									},
								},
							})({ focused: focusedItemIndex === i })}
							style="display:flex; align-items: center"
						>
							<div
								class={css({ color: '$indigo400', size: 4 })()}
								style="display:flex; align-items:center; justify-content: center"
							>
								{#if selectedItems.some((e) => e.id === item.id)}
									<div in:fly>
										<Icon src={Check} size="16" />
									</div>
								{/if}
							</div>

							<p class={css({ fontSize: '$sm' })()}>{item?.label}</p>
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div
			part="arrow"
			bind:this={refArrow}
			class={css({ border: '1px solid $dark300', size: 1.5, bg: '$dark400' })()}
			style="position:absolute; {arrowX ? `left:${arrowX}px;` : ''}{arrowY
				? `top:${arrowY}px;`
				: ''} transform:rotate(45deg); {staticSide}: -4px"
		/>
	</div>
{/if}
