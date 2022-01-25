<script lang="ts">
	import { computePosition, flip, offset, shift, size } from '@floating-ui/dom'
	import { scale } from 'svelte/transition'
	import { clickOutside } from '../actions/clickOutside'
	import type { FloatingPosition } from '../types'
	export let position: FloatingPosition = 'bottom-end'

	export let posX = 0
	export let posY = 0

	export let ref = null
	export let trigger = null

	export let clickOutsideCallback: () => void = null
	export let clickOutsideEnabled = false

	export async function updatePosition() {
		if (trigger && ref) {
			const {
				x,
				y,
				middlewareData,
				placement: pl
			} = await computePosition(trigger, ref, {
				placement: position,
				middleware: [
					flip(),
					shift(),
					// arrow({ element: refArrow }),
					offset(5),
					size({
						apply({ width, height }) {
							Object.assign(ref.style, {
								maxWidth: `${width}px`,
								maxHeight: `${height}px`
							})
						}
					})
				]
			})

			posX = x
			posY = y

			// staticSide = {
			// 	top: 'bottom',
			// 	right: 'left',
			// 	bottom: 'top',
			// 	left: 'right'
			// }[pl.split('-')[0]]

			// arrowX = middlewareData.arrow.x
			// arrowY = middlewareData.arrow.y
		}
	}
</script>

<div
	data-steeze-floating-content-wrapper
	style="position: absolute; min-width: max-content; will-change: transform;"
	style:top="{posY}px"
	style:left="{posX}px"
	in:scale={{ start: 0.9, duration: 125, opacity: 0.6 }}
	bind:this={ref}
	use:clickOutside={{
		cb: () => {
			clickOutsideCallback?.()
		},
		enabled: clickOutsideEnabled,
		exclude: [trigger]
	}}
>
	<slot />
</div>
