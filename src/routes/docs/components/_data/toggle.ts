import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Toggle',
		description: 'Switch a value betwenn two states',
		color: 4,
		type: 1
	},
	features: ['Customizable', 'Prefix & Suffix', 'Form Ready'],
	docs: {
		'API Reference': {
			Properties: [
				// ...fieldContainerApi['Properties'],
				{
					Property: { text: 'checked', help: 'The value of the Toggle' },
					Type: 'Boolean',
					Default: 'false'
				},
				{
					Property: {
						text: 'disabled',
						help: 'If the user can change the value'
					},
					Type: 'Boolean',
					Default: 'false'
				},
				{
					Property: {
						text: 'name',
						help: 'Name attribute for forms'
					},
					Type: 'String',
					Default: 'null'
				},
				{
					Property: {
						text: 'value',
						help: 'Value attribute for forms'
					},
					Type: 'String',
					Default: '"on"'
				}
			],
			// Slots: [],
			Events: [{ Name: 'change', Type: '-', Notes: '_Listen when User changes the value' }]
		},
		Styling: {
			'CSS variables': [
				{ Name: '--st-toggle-size', Default: '20px', Notes: 'Diameter of the Thumb' },
				{ Name: '--st-toggle-offset', Default: '4px', Notes: 'Offset between Root and Thumb' },
				{
					Name: '--st-toggle-bg-color',
					Default: '--st-colors-dark2',
					Notes: 'BG of Root when unchecked'
				},
				{
					Name: '--st-toggle-checked-bg-color',
					Default: '--st-colors-primary5',
					Notes: 'BG of Root when checked'
				},
				{
					Name: '--st-toggle-thumb-bg-color',
					Default: '--st-colors-dark8',
					Notes: 'BG of Thumb when unchecked'
				},
				{
					Name: '--st-toggle-thumb-checked-bg-color',
					Default: '--st-colors-light3',
					Notes: 'BG of Thumb when checked'
				}
			],
			Themes: [
				{ Name: 'light', Notes: 'Light Appearance of the Component' },
				{ Name: 'small', Notes: 'Smaller Appearance of the Component' },
				{ Name: 'borderless', Notes: 'Renders without a border' }
			],
			Globals: [
				{ Classname: 'light', Notes: 'Light Appearance of the Component' },
				{ Classname: 'st-small', Notes: 'Smaller Appearance of the Component' }
			]
		}
	}
}

export const quickstart = `<script>
  import {Toggle} from '@steeze-ui/components'
</script>

<Toggle checked />`

export const examples: ComponentExample[] = [
	{
		title: 'Listen for changes',
		description: 'Use the dispatched listener change to run custom code when the value changes',
		source: `<Toggle
  on:change={(e) => {
    console.log(e.detail.checked)
  }}
/>`
	},
	{
		title: 'Usable with HTML forms',
		description: 'Your backend will receive the associated formData',
		source: `<form action="/api/toggle" method="post">
  <Toggle
    name="my-toggle"
    value="active"
  /> 
</form>`
	}
]
