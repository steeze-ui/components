<script script lang="ts">
	import Floating from '$lib/core/parts/Floating.svelte'
	import Portal from '$lib/core/parts/Portal.svelte'
	import type { FloatingPosition } from '$lib/core/types'
	import { X } from '@steeze-ui/heroicons'
	import Icon from '@steeze-ui/svelte-icon/Icon.svelte'
	import { getId } from '../core/stores/id'

	export let position: FloatingPosition = 'bottom'
	export let showClose = false
	export let opened = false
	export let theme = ''

	const contentId = getId()

	let refTrigger: HTMLElement
	let refFloating: any

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
			{position}
			trigger={refTrigger}
			bind:this={refFloating}
			clickOutsideEnabled
			clickOutsideCallback={setClosed}
		>
			<div data-component="popover" data-theme={theme} role="dialog" id={contentId} tabindex="-1">
				{#if showClose}
					<div style="position:absolute; color:white; top:0rem; right:0rem">
						<button
							on:click={() => {
								setOpened(false)
							}}
						>
							<Icon src={X} size="16" />
						</button>
					</div>
				{/if}
				<slot name="content" />
			</div>
		</Floating>
	</Portal>
{/if}

<style>
	[data-component='popover'] {
		overflow: auto;
		z-index: 100;
		padding: var(--st-popover-padding, var(--st-overlay-padding));
		box-shadow: var(--st-popover-box-shadow, var(--st-overlay-box-shadow));
		background-color: var(--st-popover-bg-color, var(--st-overlay-bg-color));
		border: var(--st-popover-border-width, var(--st-overlay-border-width)) solid
			var(--st-popover-border-color, var(--st-overlay-border-color));
		border-radius: var(--st-popover-border-radius, var(--st-overlay-border-radius));
	}
</style>
