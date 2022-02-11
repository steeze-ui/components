import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Tabs',
		description: 'Display content depending on the selected Tab',
		color: 19,
		type: 2
	},
	features: [],
	docs: {
		'API Reference': {
			Properties: [
				{ Property: 'name', Type: 'String', Default: 'null' },
				{ Property: 'value', Type: 'String', Default: '""' }
			],
			Slots: [
				{ Name: 'label', Props: ['id', 'htmlfor'], Notes: '_-' },
				{ Name: 'helper', Props: ['id', 'htmlfor'], Notes: '_-' }
			],
			Events: [
				{ Name: 'focus', Type: '-', Notes: '_Listen when input gets focus' },
				{ Name: 'blur', Type: '-', Notes: '_Listen when input loses focus' },
				{ Name: 'clear', Type: '{details: {old: String}}', Notes: '_Listen when input clears' }
			]
		},
		Styling: {
			'CSS variables': [{ Name: '--st-text-field-color', Default: '--st-field-color' }],
			Themes: [
				{ Name: 'small', Notes: 'Smaller Appearance of the Component', Global: 'true' },
				{ Name: 'borderless', Notes: 'Renders without a border', Global: 'true' }
			]
		}
	}
}

export const quickstart = `<script>
  import {Tabs} from "@steeze-ui/components"
</script>

<Tabs />`

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
