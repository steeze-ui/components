import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Checkbox',
		description: 'Binary input with a checkmark',
		color: 38,
		type: 1
	},
	features: [],
	docs: {
		'API Reference - CheckboxGroup': {
			Properties: [
				{
					Property: {
						text: 'name',
						help: 'The name property that is passed to each Checkbox within the CheckboxGroup. If not provided, the generated id of the group will be used.'
					},
					Type: 'String',
					Default: 'null'
				},
				{
					Property: {
						text: 'value',
						help: 'The value property in form of a string[] containing the values of the selected Checkboxes.'
					},
					Type: 'String[]',
					Default: 'null'
				},
				{ Property: 'label', Type: 'String', Default: 'null' },
				{ Property: 'orientation', Type: 'GroupOrientation', Default: "'horizontal'" }
			],
			Slots: [{ Name: 'default', Props: '-', Notes: '_The related Checkboxes' }]
		},
		'Styling - CheckboxGroup': {
			'CSS variables': [
				{
					Name: '--st-checkbox-gap',
					Default: '0.25rem',
					Notes: '_The gap between label and items'
				},
				{
					Name: '--st-checkbox-items-horizontal-gap',
					Default: '0.75rem',
					Notes: "_The gap between RadioButton's when horizontal"
				},
				{
					Name: '--st-checkbox-items-vertical-gap',
					Default: '0.5rem',
					Notes: "_The gap between RadioButton's when vertical"
				}
			]
		},
		'API Reference - Checkbox': {
			Properties: [
				{ Property: 'label', Type: 'String', Default: 'null' },
				{ Property: 'name', Type: 'String', Default: 'null' },
				{ Property: 'value', Type: 'String', Default: 'null' },
				{
					Property: {
						text: 'group',
						help: 'Binds the selected value of the Checkbox to a array.'
					},
					Type: 'String[]',
					Default: 'null'
				}
			],
			Slots: [{ Name: 'label', Props: ['id', 'label'], Notes: '_Render a custom label' }]
		},
		'Styling - Checkbox': {
			'CSS variables': [
				{
					Name: '--st-checkbox-label-font-size',
					Default: '--st-font-size-base'
				},
				{
					Name: '--st-checkbox-label-font-weight',
					Default: '--st-font-weight-normal'
				},
				{
					Name: '--st-checkbox-label-color',
					Default: '--st-body-text-color'
				},
				{
					Name: '--st-checkbox-indicator-size',
					Default: '--st-box-size'
				},
				{
					Name: '--st-checkbox-indicator-bg-color',
					Default: '--st-box-bg-color'
				},
				{
					Name: '--st-checkbox-indicator-border-color',
					Default: '--st-box-border-color'
				},
				{
					Name: '--st-checkbox-indicator-border-radius',
					Default: '--border-radius-full'
				},
				{
					Name: '--st-checkbox-indicator-selected-bg-color',
					Default: '--st-colors-light1'
				},
				{
					Name: '--st-checkbox-indicator-selected-bg-color',
					Default: '--st-box-selected-bg-color'
				}
			]
		}
	}
}

export const quickstart = `<script>
	import { CheckboxGroup, Checkbox } from "@steeze-ui/components"
	let group = ["option 1", "option 2"]
	let single = ["option 3"]
</script>

<CheckboxGroup label="Group" bind:value={group} >
	<RadioButton label="Option 1" value="option 1" />
	<RadioButton label="Option 2" value="option 2" />
</CheckboxGroup>

<Checkbox label="Single" value="option 3" bind:group={single} />`

export const examples: ComponentExample[] = []
