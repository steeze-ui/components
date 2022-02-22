import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Text Area',
		description: 'Field for large text with extendable height',
		color: 18,
		type: 1
	},
	features: [],
	docs: {
		'API Reference': {
			Properties: [
				// ...fieldContainerApi['Properties'],
				{ Property: 'name', Type: 'String', Default: 'null' },
				{ Property: 'value', Type: 'String', Default: '""' },
				{ Property: 'placeholder', Type: 'String', Default: 'null' },
				{ Property: 'required', Type: 'Boolean', Default: 'false' },
				{ Property: 'disabled', Type: 'Boolean', Default: 'false' },
				{ Property: 'autoselect', Type: 'Boolean', Default: 'false' },
				{ Property: 'width', Type: 'String', Default: 'var(--st-field-width)' },
				{ Property: 'height', Type: 'String', Default: 'auto' },
				{
					Property: {
						text: '*',
						help: 'All the rest is applied to the textarea element'
					},
					Type: '*',
					Default: '-'
				}
			],
			Slots: [
				{ Name: 'label', Props: ['id', 'htmlfor'], Notes: '_-' },
				{ Name: 'helper', Props: ['id', 'htmlfor'], Notes: '_-' }
			],
			Events: [
				{ Name: 'input', Type: 'Event', Notes: '_Listen for value change on every keystroke' },
				{ Name: 'change', Type: 'Event', Notes: '_Listen for value change when input loses focus' },
				{ Name: 'focus', Type: '-', Notes: '_Listen when input gets focus' },
				{ Name: 'blur', Type: '-', Notes: '_Listen when input loses focus' }
			]
		},
		Styling: {
			'CSS variables': [
				{ Name: '--st-text-area-color', Default: '--st-field-color' },
				{ Name: '--st-text-area-font-size', Default: '--st-field-font-size' },
				{ Name: '--st-placeholder-text-color', Default: '--st-colors-gray7' }
			],
			Themes: [
				{ Name: 'light', Notes: 'Light Appearance of the Component' },
				{ Name: 'small', Notes: 'Smaller Appearance of the Component' },
				{ Name: 'borderless', Notes: 'Renders without a border' },
				{ Name: 'transparent', Notes: 'Renders without a background color' }
			],
			Globals: [
				{ Classname: 'light', Notes: 'Light Appearance of the Component' },
				{ Classname: 'st-small', Notes: 'Smaller Appearance of the Component' }
			]
		}
	}
}

export const quickstart = `<script>
  import {TextArea} from "@steeze-ui/components"
</script>

<TextArea />`

export const examples: ComponentExample[] = []
