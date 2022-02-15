<script lang="ts">
	import type {
		FlexAlignItems,
		FlexDirection,
		FlexDisplay,
		FlexFlow,
		FlexJustifyContent,
		FlexWrap
	} from '$lib/core/types/flex'

	export let display: FlexDisplay = 'flex'
	export let direction: FlexDirection = 'row'
	export let justify: FlexJustifyContent = 'flex-start'
	export let align: FlexAlignItems = 'flex-start'
	export let wrap: FlexWrap = 'nowrap'
	export let flow: FlexFlow = null
	export let gap: string = null
	export let shrink = 1
	export let grow = 0
	export let basis = 'auto'
</script>

<div
	data-component="flex"
	{...$$restProps}
	style:display
	style:justify-content={justify}
	style:align-items={align}
	style:flex-flow={flow}
	style:gap
	style:shrink
	style:grow
	style:basis
	style:wrap
	style:flex-direction={direction}
>
	<slot />
</div>
