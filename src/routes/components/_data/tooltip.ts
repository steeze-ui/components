import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Tooltip',
		description: 'Display Content when hovering over a Trigger',
		color: 0,
		type: 2
	},
	features: ['Custom Trigger', 'Custom Content', 'Smart Floating Content'],
	docs: {
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
}

export const quickstart = `<script>
  import {Tooltip, Button} from '@steeze-ui/components'
</script${'>'}

<Tooltip>
  <Button slot="trigger" let:id aria-describedby={id}>Open</Button>
  <span slot="content">Hi There! Iam Content.</span>
</Tooltip>`

export const examples: ComponentExample[] = [
	{
		title: 'Use with icon',
		description: 'You can use any Icon from any Icon Pack',
		source: `<script>
  import { Moon } from '@steeze-ui/heroicons'
  import { Button } from '@steeze-ui/components'
</script>

<Button icon={Moon} iconTheme="solid" />`
	}
]
