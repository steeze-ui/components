import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: '?',
		description: '',
		color: 1,
		type: 1
	},
	features: [],
	docs: {
		'API Reference': {
			Properties: [{ Property: 'name', Type: 'String', Default: 'null' }],
			Slots: [{ Name: 'label', Props: ['id', 'htmlfor'], Notes: '_-' }],
			Events: [{ Name: 'focus', Type: '-', Notes: '_Listen when input gets focus' }]
		},
		Styling: {
			'CSS variables': [{ Name: '--st-text-field-color', Default: '--st-field-color' }],
			Themes: [{ Name: 'small', Notes: 'Smaller Appearance of the Component', Global: 'true' }]
		}
	}
}

export const quickstart = `<script>
  import {?} from "@steeze-ui/components"
</script>

<? />`

export const examples: ComponentExample[] = []
