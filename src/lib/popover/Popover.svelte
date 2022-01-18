<script script lang="ts">
	import { clickOutside } from '$lib/core/actions/clickOutside'
	import { portal } from '$lib/core/actions/portal'

	import Button from '$lib/steeze-ui/button/Button.svelte'
	import { arrow, computePosition, flip, offset, size } from '@floating-ui/dom'
	import { X } from '@steeze-ui/heroicons'
	import { fly } from 'svelte/transition'
	import { getId } from '../core/utils/id'

	const contentId = getId()

	let refTrigger: HTMLElement
	let refContent: HTMLElement
	let refArrow: HTMLElement

	let floatingX = 0
	let floatingY = 0

	let arrowX = 0
	let arrowY = 0
	let staticSide: string

	let opened = false

	$: opened && refContent && refArrow && updatePosition()

	export async function updatePosition() {
		const {
			x,
			y,
			middlewareData,
			placement: pl
		} = await computePosition(refTrigger, refContent, {
			placement: 'bottom',
			middleware: [
				// shift(),
				flip(),
				arrow({ element: refArrow }),
				offset(10),
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

		staticSide = {
			top: 'bottom',
			right: 'left',
			bottom: 'top',
			left: 'right'
		}[pl.split('-')[0]]

		floatingX = x
		floatingY = y

		arrowX = middlewareData.arrow.x
		arrowY = middlewareData.arrow.y
	}

	export function setOpened(value: boolean) {
		opened = value
	}

	export function toggleOpened() {
		opened = !opened
	}

	const contentStyles = css({
		border: '1px solid $dark300',
		position: 'absolute',
		boxShadow: '$lg',
		p: 4,
		zIndex: 40,
		borderRadius: '$default',
		backgroundColor: '$dark500'
	})()

	const arrowStyles = css({
		backgroundColor: '$dark500',
		border: '1px solid $dark300',
		position: 'absolute',
		size: 2
	})()
</script>

<div bind:this={refTrigger}>
	<slot name="trigger" {opened} id={contentId} {toggleOpened} />
</div>

{#if opened}
	<div
		role="dialog"
		id={contentId}
		tabindex="-1"
		in:fly={{ y: -5, duration: 200 }}
		use:clickOutside={{
			cb: () => {
				setOpened(false)
			},
			enabled: true,
			exclude: [refTrigger]
		}}
		use:portal
		bind:this={refContent}
		class={contentStyles}
		style="position:absolute;left:{floatingX}px;top:{floatingY}px"
	>
		<div style="position:absolute; color:white; top:0.25rem; right:0.25rem">
			<Button
				icon={X}
				on:click={() => {
					setOpened(false)
				}}
				variants={{ background: 'transparent', borderless: true }}
			/>
		</div>
		<slot />
		<div
			part="arrow"
			bind:this={refArrow}
			class={arrowStyles}
			style="{arrowX ? `left:${arrowX}px;` : ''}{arrowY
				? `top:${arrowY}px;`
				: ''} transform:rotate(45deg); {staticSide}: -4px"
		/>
	</div>
{/if}
