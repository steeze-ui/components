<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
	import type { Example, Feature, Meta } from '$lib/_internal/docs/Component.svelte'
	import Component from '$lib/_internal/docs/Component.svelte'

	const meta: Meta = {
		title: 'Tooltip',
		description: 'Display Content when hovering over a Trigger',
		color: 0,
		type: 2
	}

	const features: Feature[] = ['Custom Trigger', 'Custom Content', 'Smart Floating Content']

	const quickstart = ''
	// 	`<script>
	// 	import {Tooltip, Button} from '@steeze-ui/components'
	// </script${'>'}

	// <Tooltip>
	// 	<Button slot="trigger" let:id aria-describedby={id}>Open</Button>
	// 	<span slot="content">Hi There! Iam Content.</span>
	// </Tooltip>`

	const docs = {
		'API Reference': {
			Properties: [
				{
					Property: {
						text: 'position',
						help: 'Prefered Position of the tooltip'
					},
					Type: 'FloatingPosition',
					Default: '"bottom"'
				},
				{
					Property: {
						text: 'delay',
						help: 'Delay in ms of how long the cursor needs to touch the trigger in order to display the tooltip'
					},
					Type: 'Number',
					Default: '500'
				}
			],
			Slots: [
				{
					Name: 'trigger',
					Props: ['id'],
					Notes: '_The trigger that initiates the tooltip content'
				},
				{ Name: 'content', Props: '-', Notes: '_The content to display in the tooltip' }
			],
			Events: [
				{ Name: 'focus', Type: '-', Notes: '_Listen when input gets focus' },
				{ Name: 'blur', Type: '-', Notes: '_Listen when input loses focus' },
				{ Name: 'clear', Type: '{details: {old: String}}', Notes: '_Listen when input clears' }
			]
		},
		Styling: {
			'CSS variables': [
				{ Name: '--st-tooltip-padding', Default: '--st-field-padding-sm' },
				{ Name: '--st-tooltip-font-size', Default: '--st-font-size-sm' },
				{ Name: '--st-tooltip-font-weight', Default: '--st-font-weight-normal' },
				{ Name: '--st-tooltip-color', Default: '--st-body-text-color' },
				{ Name: '--st-tooltip-bg-color', Default: '--st-overlay-bg-color' },
				{ Name: '--st-tooltip-border-radius', Default: '--st-overlay-border-radius' }
			]
		}
	}

	const examples: Example[] = []
</script>

<Component {meta} {features} {quickstart} {docs} {examples}>
	<Tooltip>
		<Button slot="trigger">Hover Me</Button>
		<span slot="content">Hi There! Iam Content.</span>
	</Tooltip>
</Component>
