<script script lang="ts">
	import Button from '$lib/button/Button.svelte'

	import Floating from '$lib/core/parts/Floating.svelte'
	import Portal from '$lib/core/parts/Portal.svelte'
	import type { FloatingPosition } from '$lib/core/types'
	import { X } from '@steeze-ui/heroicons'
	import { getId } from '../core/utils/id'

	const contentId = getId()

	export let position: FloatingPosition
	let refTrigger: HTMLElement
	let refFloatingElement: HTMLElement
	let refFloating: any

	let opened = false

	$: opened && refFloating && refFloating.updatePosition()

	export function setOpened(value: boolean) {
		opened = value
	}

	export function setClosed() {
		opened = false
	}

	export function toggleOpened() {
		opened = !opened
	}
</script>

<div bind:this={refTrigger}>
	<slot name="trigger" {opened} id={contentId} {toggleOpened} />
</div>

{#if opened}
	<Portal>
		<Floating
			bind:ref={refFloatingElement}
			{position}
			trigger={refTrigger}
			bind:this={refFloating}
			clickOutsideCallback={setClosed}
		>
			<div part="dialog" role="dialog" id={contentId} tabindex="-1">
				<div style="position:absolute; color:white; top:0rem; right:0rem">
					<Button
						theme="tertiary"
						icon={X}
						on:click={() => {
							setOpened(false)
						}}
					/>
				</div>
				<slot />
			</div>
		</Floating>
	</Portal>
{/if}

<style>
	/* Overlay */
	[part='dialog'] {
		overflow: auto;
		box-shadow: var(--st-overlay-box-shadow);
		border: var(--st-overlay-border-width) solid var(--st-overlay-border-color);
		background-color: var(--st-overlay-bg-color);
		border-radius: var(--st-overlay-border-radius);
		padding: 1rem;
		z-index: 50;
	}
</style>
