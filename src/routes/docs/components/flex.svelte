<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import { Select } from '$lib'
	import type { FlexAlignItems, FlexDirection, FlexJustifyContent } from '$lib/core/types/flex'

	import Flex from '$lib/flex/Flex.svelte'
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/flex'

	const directionItems: { label: string; id: FlexDirection }[] = [
		{ label: 'row', id: 'row' },
		{ label: 'column', id: 'column' }
	]
	const justifyItems: { label: string; id: FlexJustifyContent }[] = [
		{ label: 'center', id: 'center' },
		{ label: 'flex-start', id: 'flex-start' },
		{ label: 'flex-end', id: 'flex-end' },
		{ label: 'between', id: 'space-between' },
		{ label: 'around', id: 'space-around' },
		{ label: 'evenly', id: 'space-evenly' }
	]
	const alignItems: { label: string; id: FlexAlignItems }[] = [
		{ label: 'center', id: 'center' },
		{ label: 'flex-start', id: 'flex-start' },
		{ label: 'flex-end', id: 'flex-end' },
		{ label: 'stretch', id: 'stretch' }
	]

	let direction = directionItems[0]
	let justify = justifyItems[0]
	let align = alignItems[0]
	let gap = 1

	$: gapValue = `${gap}rem`
</script>

<Component {data} {quickstart} {examples} classExtend="h-16">
	<Flex
		class="st-size-small w-full h-full"
		bind:direction={direction.id}
		bind:justify={justify.id}
		bind:align={align.id}
		bind:gap={gapValue}
	>
		<Select label="flex-direction" items={directionItems} bind:value={direction} width="100px" />
		<Select label="justify-content" items={justifyItems} bind:value={justify} width="100px" />
		<Select label="align-items" items={alignItems} bind:value={align} width="100px" />
	</Flex>
</Component>
