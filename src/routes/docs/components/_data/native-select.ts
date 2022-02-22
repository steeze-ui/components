import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Native Select',
		description: 'System Native Select component',
		color: 31,
		type: 1
	},
	features: [],
	docs: {
		'API Reference': {
			Properties: [
				{ Property: 'label', Type: 'String', Default: 'null' },
				{ Property: 'helper', Type: 'String', Default: 'null' },
				{ Property: 'width', Type: 'String', Default: "'12rem'" },
				{ Property: 'theme', Type: 'String', Default: 'null' },
				{ Property: 'name', Type: 'String', Default: 'null' },
				{ Property: 'disabled', Type: 'Boolean', Default: 'false' },
				{ Property: 'required', Type: 'Boolean', Default: 'false' },
				{
					Property: {
						text: 'focus',
						help: 'Focus the select element when mounted to the DOM'
					},
					Type: 'Boolean',
					Default: 'false'
				},
				{
					Property: {
						text: '*',
						help: 'All the rest is applied to the select element'
					},
					Type: '*',
					Default: '-'
				}
			],
			Slots: [
				{
					Name: 'label',
					Props: ['htmlFor', 'id'],
					Notes: '_Place a custom label above the field'
				},
				{
					Name: 'helper',
					Props: ['htmlFor', 'id'],
					Notes: '_Place a custom helper below the field'
				},
				{
					Name: 'prefix',
					Props: '-',
					Notes: '_Place custom content in the field but before the input'
				},
				{
					Name: 'suffix',
					Props: '-',
					Notes: '_Place custom content in the field but after the input'
				}
			],
			Events: [{ Name: 'change', Type: 'ChangeEvent', Notes: '-' }]
		},
		Styling: {
			'CSS variables': [
				{
					Name: '--st-select-color',
					Default: '--st-field-color'
				},
				{
					Name: '--st-select-font-size',
					Default: '--st-field-font-size'
				},
				{
					Name: '--st-select-font-weight',
					Default: '--st-field-font-weight'
				},
				{
					Name: '--st-field-height',
					Default: '--st-field-height-md'
				},
				{
					Name: '--st-field-padding',
					Default: '--st-field-padding-md'
				},
				{
					Name: '--st-field-bg-color',
					Default: ['light:white', 'dark:--st-colors-dark8']
				},
				{
					Name: '--st-field-border-radius',
					Default: '--st-field-border-radius-md'
				},
				{
					Name: '--st-field-border-color',
					Default: '--st-border-color'
				}
			],
			Themes: [
				{
					Name: 'light',
					Notes: 'Light Appearance of the Component'
				},
				{
					Name: 'small',
					Notes: 'Smaller Appearance of the Component'
				},
				{
					Name: 'borderless',
					Notes: 'Renders without a border'
				},
				{
					Name: 'transparent',
					Notes: 'Renders without a background color'
				}
			],
			Globals: [
				{
					Classname: 'light',
					Notes: 'Light Appearance of the Component'
				},
				{
					Classname: 'st-small',
					Notes: 'Smaller Appearance of the Component'
				}
			]
		}
	}
}

export const quickstart = `<script>
	import { NativeSelect } from "@steeze-ui/components"
	let value = '1'
</script>

<NativeSelect bind:value label="Label">
	<option value="1">Option 1</option>
	<option value="2">Option 2</option>
</NativeSelect>`

export const examples: ComponentExample[] = []
