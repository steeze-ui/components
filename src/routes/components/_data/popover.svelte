<script lang="ts" context="module">
	export const api = {
		Properties: [
			{
				Property: {
					text: 'opened',
					help: 'Bind to read value if content is opened or set it explicitly'
				},
				Type: 'Boolean',
				Default: 'false'
			},
			{
				Property: {
					text: 'position',
					help: 'Prefered initial position of the floating content'
				},
				Type: 'FloatingPosition',
				Default: '"bottom"'
			},
			{
				Property: {
					text: 'showClose',
					help: 'Show the close Button of the floating content'
				},
				Type: 'Boolean',
				Default: '"false"'
			},
			{
				Property: {
					text: '*',
					help: 'Everything else will be applied to the Content Wrapper'
				},
				Type: '*',
				Default: '-'
			}
		],
		Slots: [
			{
				Name: 'trigger',
				Props: ['id', 'opened', 'toggleOpened()'],
				Notes: '_The trigger that indicates the popover content'
			},
			{ Name: 'content', Props: '-', Notes: '_The content to display when opened' }
		]
		// Events: [
		// ]
	}

	export const styling = {
		'Custom Properties': [
			{ Name: '--st-popover-padding', Default: '1rem' },
			{ Name: '--st-popover-box-shadow', Default: '--st-overlay-box-shadow' },
			{ Name: '--st-popover-bg-color', Default: '--st-overlay-bg-color' },
			{ Name: '--st-popover-border-radius', Default: '--st-overlay-border-radius' },
			{ Name: '--st-popover-border-width', Default: '--st-overlay-border-width' },
			{ Name: '--st-popover-border-color', Default: '--st-overlay-border-color' }
		]
		// Themes: [
		// ]
	}
</script>

<script lang="ts">
	import Demo from '$lib/internal/docs/Demo.svelte'
	import Features from '$lib/internal/docs/Features.svelte'
	import Title from '$lib/internal/docs/Title.svelte'

	import Popover from '$lib/popover/Popover.svelte'
	import Button from '$lib/button/Button.svelte'

	export let id: number
	export let type: number
	export let title: string
	export let description: string
</script>

<Title {title} {type} {description} />

<Demo {id}>
	<Popover>
		<svelte:fragment slot="trigger" let:toggleOpened>
			<Button on:click={toggleOpened}>open</Button>
		</svelte:fragment>
		<div slot="content">
			<p style:color="white">Content</p>
		</div>
	</Popover>
</Demo>

<Features
	features={[
		'Keyboard support',
		'Screen Reader capable',
		'Smart Floating Content',
		'Custom Content'
	]}
/>
