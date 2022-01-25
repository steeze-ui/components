<script lang="ts">
	import Floating from '$lib/core/parts/Floating.svelte'
	import Portal from '$lib/core/parts/Portal.svelte'
	import type { FloatingPosition } from '$lib/core/types'
	import { getId } from '$lib/core/utils/id'

	export let position: FloatingPosition = 'bottom'
	export let delay = 500
	export let theme = ''

	let opened = false
	const triggerId = getId()

	let refFloating: any
	let refTrigger: HTMLElement

	let timer: NodeJS.Timeout

	$: opened && refTrigger && refFloating && refFloating.updatePosition()

	function handleEnter() {
		timer = setTimeout(() => {
			opened = true
		}, delay)
	}

	function handleLeave() {
		clearTimeout(timer)
		opened = false
		console.log('close')
	}
</script>

<div
	part="tooltip-trigger"
	bind:this={refTrigger}
	on:pointerenter={handleEnter}
	on:pointerleave={handleLeave}
>
	<slot name="trigger" id={triggerId} />
</div>

{#if opened}
	<Portal>
		<Floating bind:this={refFloating} {position} trigger={refTrigger}>
			<div part="tooltip" data-theme={theme}>
				<slot name="content" />
			</div>
		</Floating>
	</Portal>
{/if}

<style>
	[part='tooltip'] {
		font-size: var(--st-tooltip-font-size, var(--st-font-size-sm));
		font-weight: var(--st-tooltip-font-weight, var(--st-font-weight-normal));
		color: var(--st-tooltip-color, var(--st-body-text-color));
		padding: var(--st-tooltip-padding, var(--st-field-padding-sm));
		background-color: var(--st-tooltip-bg-color, var(--st-overlay-bg-color));
		border-radius: var(--st-tooltip-border-radius, var(--st-overlay-border-radius));
		border: var(--st-tooltip-border-width, var(--st-overlay-border-width)) solid
			var(--st-tooltip-border-color, var(--st-overlay-border-color));
	}
</style>
