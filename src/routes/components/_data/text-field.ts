import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Text Field',
		description: 'User Input as Simple Text',
		color: 1,
		type: 1
	},
	features: ['Customizable', 'Prefix & Suffix', 'Form Ready'],
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
				{ Property: 'clearable', Type: 'Boolean', Default: 'false' }
			],
			Slots: [
				{ Name: 'label', Props: ['id', 'htmlfor'], Notes: '_-' },
				{ Name: 'helper', Props: ['id', 'htmlfor'], Notes: '_-' },
				{ Name: 'prefix', Props: '-', Notes: '_-' },
				{ Name: 'suffix', Props: '-', Notes: '_-' }
			],
			Events: [
				{ Name: 'input', Type: 'Event', Notes: '_Listen for value change on every keystroke' },
				{ Name: 'change', Type: 'Event', Notes: '_Listen for value change when input loses focus' },
				{ Name: 'clear', Type: '{details: {old: String}}', Notes: '_Listen when input clears' },
				{ Name: 'focus', Type: '-', Notes: '_Listen when input gets focus' },
				{ Name: 'blur', Type: '-', Notes: '_Listen when input loses focus' }
			]
		},
		Styling: {
			'CSS variables': [
				{ Name: '--st-text-field-color', Default: '--st-field-color' },
				{ Name: '--st-text-field-font-size', Default: '--st-field-font-size' },
				{ Name: '--st-field-height', Default: '--st-field-height-md' },
				{ Name: '--st-placeholder-text-color', Default: '--st-colors-gray7' },
				{ Name: '--st-field-button-color', Default: '--st-colors-gray5' },
				{ Name: '--st-field-button-hover-color', Default: '--st-colors-gray2' }
			],
			Themes: [
				{ Name: 'light', Notes: 'Light Appearance of the Component' },
				{ Name: 'small', Notes: 'Smaller Appearance of the Component' },
				{ Name: 'borderless', Notes: 'Renders without a border' },
				{ Name: 'transparent', Notes: 'Renders without a background color' }
			],
			Globals: [
				{ Classname: 'light', Notes: 'Light Appearance of the Component' },
				{ Classname: 'st-size-small', Notes: 'Smaller Appearance of the Component' }
			]
		}
	}
}

export const quickstart = `<script>
	import {TextField} from '@steeze-ui/components'
</script>

<TextField />`

export const examples: ComponentExample[] = [
	{
		title: 'Example usage',
		source: `<script>
	import { TextField } from '@steeze-ui/components'
</script>

<Button />`
	}
]
