<script lang="ts">
	import Portal from '$lib/core/parts/Portal.svelte'
	import { getId } from '$lib/core/stores/id'
	import { focus } from 'focus-svelte'
	import { createEventDispatcher } from 'svelte'
	import { scale, type ScaleParams } from 'svelte/transition'

	export let opened = false
	export let draggable = false
	export let resizable = false
	export let unclosable = false

	export let width = 'auto'
	export let height = 'auto'

	export let scaleInParams: ScaleParams = { duration: 250, start: 0.9, opacity: 0.8 }

	let refOverlay: HTMLDivElement
	let refDialog: HTMLDivElement

	const dispatch = createEventDispatcher()

	const id = getId()

	export const setOpened = (value: boolean) => {
		opened = value

		// dispatch('openedChanged', value)
	}

	// Keyboard
	const handleKeydown = (e: KeyboardEvent) => {
		if (opened) {
			switch (e.key) {
				case 'Escape':
					setOpened(false)
					break

				default:
					break
			}
		}
	}

	// Position
	let top: number
	let left: number

	const calcOverlayPosition = () => {
		const boundsDialog = refDialog.getBoundingClientRect()
		const boundsOverlay = refOverlay.getBoundingClientRect()

		left = boundsDialog.width / 2 - boundsOverlay.width / 2
		top = boundsDialog.height / 2 - boundsOverlay.height / 2
	}

	$: (draggable || resizable) && opened && refOverlay && refDialog && calcOverlayPosition()

	$: refOverlay && refDialog && dispatch('openedChanged', opened)

	// Outside Click
	const handleOutsideClick = (e: any) => {
		if (!unclosable) {
			if (!refOverlay.contains(e.target)) {
				setOpened(false)
			}
		}
	}

	// DND
	const dragging = (node: HTMLDivElement, overlay: HTMLDivElement) => {
		const onMousedown = (e: MouseEvent) => {
			let shiftX = e.clientX - node.getBoundingClientRect().left
			let shiftY = e.clientY - node.getBoundingClientRect().top

			// moveAt(e.pageX - 1, e.pageY - 1)

			// moves the node at (pageX, pageY) coordinates
			// taking initial shifts into account
			function moveAt(pageX: number, pageY: number) {
				overlay.style.left = pageX - shiftX + 'px'
				overlay.style.top = pageY - shiftY + 'px'
			}

			function onMouseMove(e: MouseEvent) {
				moveAt(e.pageX, e.pageY)
			}

			// move the node on mousemove
			document.addEventListener('mousemove', onMouseMove)

			// drop the node, remove unneeded handlers
			node.onmouseup = function () {
				document.removeEventListener('mousemove', onMouseMove)
				node.onmouseup = null
			}
		}

		const onDragstart = () => {
			return false
		}

		node.addEventListener('mousedown', onMousedown)
		node.addEventListener('dragstart', onDragstart)

		return {
			update(prop: HTMLDivElement) {
				overlay = prop
			},

			destroy() {
				node.removeEventListener('mousedown', onMousedown)
				node.addEventListener('dragstart', onDragstart)
			}
		}
	}

	const resize = (
		node: HTMLDivElement,
		props: { direction: 'e' | 's' | 'se'; target: HTMLElement }
	) => {
		const onMousedown = (e: MouseEvent) => {
			const targetBounds = props.target.getBoundingClientRect()
			const startX = e.clientX
			const startY = e.clientY
			const startWidth = targetBounds.width
			const startHeight = targetBounds.height

			function onMouseMove(e: MouseEvent) {
				// moveAt(e.pageX, e.pageY)
				if (props.direction === 's') {
					props.target.style.height = startHeight + e.clientY - startY + 'px'
				} else if (props.direction === 'e') {
					props.target.style.width = startWidth + e.clientX - startX + 'px'
				} else if (props.direction === 'se') {
					props.target.style.width = startWidth + e.clientX - startX + 'px'
					props.target.style.height = startHeight + e.clientY - startY + 'px'
				}
			}

			// move the node on mousemove
			document.addEventListener('mousemove', onMouseMove)

			// drop the node, remove unneeded handlers
			node.onmouseup = () => {
				document.removeEventListener('mousemove', onMouseMove)
				node.onmouseup = null
			}
		}

		const onDragstart = () => {
			return false
		}

		node.addEventListener('mousedown', onMousedown)
		node.addEventListener('dragstart', onDragstart)

		return {
			update(prop: { direction: 'e' | 's' | 'se'; target: HTMLElement }) {
				props.target = prop.target
			},

			destroy() {
				node.removeEventListener('mousedown', onMousedown)
				node.addEventListener('dragstart', onDragstart)
			}
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if opened}
	<Portal>
		<div
			{id}
			data-component="dialog"
			part="dialog"
			role="dialog"
			aria-modal="true"
			bind:this={refDialog}
			on:click={handleOutsideClick}
			use:focus={{ enabled: true, assignAriaHidden: true }}
		>
			<div
				part="overlay"
				in:scale={scaleInParams}
				bind:this={refOverlay}
				style:left={left ? left + 'px' : null}
				style:top={top ? top + 'px' : null}
				style:width
				style:height
			>
				{#if draggable}
					<div class="dragger" use:dragging={refOverlay} />
				{/if}
				{#if resizable}
					<div use:resize={{ direction: 'e', target: refOverlay }} class="edge resizer e" />
					<div use:resize={{ direction: 's', target: refOverlay }} class="edge resizer s" />
					<div use:resize={{ direction: 'se', target: refOverlay }} class="resizer se" />
				{/if}
				<div part="content">
					<slot />
				</div>
			</div>
		</div>
	</Portal>
{/if}

<style>
	[part='dialog'] {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	[part='dialog']:before {
		content: '';
		background: var(--st-overlay-backdrop-bg-color);
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 0;
	}
	[part='overlay'] {
		max-width: 100%;
		max-height: 100%;
		display: flex;
		flex-direction: column;
		position: absolute;
		z-index: 1000;
		background: var(--st-dialog-bg-color, var(--st-overlay-bg-color));
		border: 1px solid var(--st-dialog-border-color, var(--st-overlay-border-color));
		border-radius: var(--st-dialog-border-radius, var(--st-overlay-border-radius));
		box-shadow: var(--st-dialog-box-shadow, var(--st-overlay-box-shadow));
		padding: var(--st-dialog-padding, 2rem);
	}

	.resizer.edge.e {
		height: auto;
		left: auto;
		cursor: ew-resize;
	}
	.resizer.edge.s {
		width: auto;
		top: auto;
		cursor: ns-resize;
	}
	.resizer.se {
		bottom: -4px;
		right: -4px;
		cursor: nwse-resize;
	}

	.resizer.edge {
		height: 8px;
		width: 8px;
		top: -4px;
		right: -4px;
		bottom: -4px;
		left: -4px;
	}
	.resizer {
		position: absolute;
		height: 16px;
		width: 16px;
	}

	.dragger {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		width: auto;
		bottom: auto;
		cursor: move;
		height: var(--st-dialog-draggable-height, 16px);
	}
</style>
