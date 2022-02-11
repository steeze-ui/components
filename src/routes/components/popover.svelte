<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import Popover from '$lib/popover/Popover.svelte'
	import Component, { Example, Feature, Meta } from '$lib/_internal/docs/Component.svelte'

	const meta: Meta = {
		color: 1,
		type: 2,
		title: 'Popover',
		description: 'Display Content that floats around a trigger'
	}

	const features: Feature[] = [
		'Keyboard support',
		'Screen Reader capable',
		'Smart Floating Content',
		'Custom Content'
	]

	const quickstart = ''
	// 	`<script>
	// 	import {Popover,Button} from '@steeze-ui/components'
	// </script${'>'}
	//
	// <Popover>
	// 	<Button slot="trigger">open</Button>
	// 	<div slot="content">
	// 		content
	// 	</div>
	// </Popover>`

	const docs = {
		'API Reference': {
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
		},
		Styling: {
			'CSS variables': [
				{ Name: '--st-popover-padding', Default: '1rem' },
				{ Name: '--st-popover-box-shadow', Default: '--st-overlay-box-shadow' },
				{ Name: '--st-popover-bg-color', Default: '--st-overlay-bg-color' },
				{ Name: '--st-popover-border-radius', Default: '--st-overlay-border-radius' },
				{ Name: '--st-popover-border-width', Default: '--st-overlay-border-width' },
				{ Name: '--st-popover-border-color', Default: '--st-overlay-border-color' }
			]
		}
	}

	const examples: Example[] = []
</script>

<Component {meta} {features} {quickstart} {docs} {examples}>
	<Popover>
		<Button slot="trigger" let:toggleOpened on:click={toggleOpened}>open</Button>

		<div slot="content">
			<p style:color="white">Content</p>
		</div>
	</Popover>
</Component>
