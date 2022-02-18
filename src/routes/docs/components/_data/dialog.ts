import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Dialog',
		description: 'Show Modal Content',
		color: 7,
		type: 2
	},
	features: ['Draggable', 'Resizable', 'Keyboard support', 'Customizable', 'Backdrop'],
	docs: {
		'API Reference': {
			Properties: [
				{ Property: 'opened', Type: 'Boolean', Default: 'false' },
				{
					Property: {
						text: 'draggable',
						help: 'Whether the dialog is draggable from the top area of the overlay'
					},
					Type: 'Boolean',
					Default: 'false'
				},
				{
					Property: {
						text: 'resizable',
						help: 'Whether the dialog is resizable from the right edge, bottom edge or right-bottom corner'
					},
					Type: 'Boolean',
					Default: 'false'
				},
				{
					Property: {
						text: 'unclosable',
						help: 'Whether the dialog is not closable by clicking the backdrop area (It will still be closable via ESC)'
					},
					Type: 'Boolean',
					Default: 'false'
				}
			],
			Slots: [{ Name: 'default', Props: '-', Notes: '_-' }],
			Events: [
				{
					Name: 'openedChanged',
					Type: 'Boolean',
					Notes: '_Listen when the dialog is opened or closed'
				}
			]
		},
		Styling: {
			'CSS variables': [
				{ Name: '--st-overlay-backdrop-bg-color', Default: 'rgba(0, 0, 0, 0.3)' },
				{ Name: '--st-dialog-bg-color', Default: '--st-overlay-bg-color' },
				{ Name: '--st-dialog-border-color', Default: '--st-overlay-border-color' },
				{ Name: '--st-dialog-border-radius', Default: '--st-overlay-border-radius' },
				{ Name: '--st-dialog-box-shadow', Default: '--st-overlay-box-shadow' },
				{ Name: '--st-dialog-padding', Default: '--st-overlay-padding' },
				{ Name: '--st-dialog-draggable-height', Default: '16px' }
			]
			// Themes: [{ Name: 'small', Notes: 'Smaller Appearance of the Component', Global: 'true' }]
		}
	}
}

export const quickstart = `<script>
	import { Dialog, Button } from "@steeze-ui/components"
	let opened = false
</script>

<Button on:click={() => (opened = true)}>Open</Button>
<Dialog bind:opened>
	My Content
</Dialog>`

export const examples: ComponentExample[] = []
