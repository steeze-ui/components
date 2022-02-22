import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Radio Group',
		description: 'Select one value from a list of options',
		color: 37,
		type: 1
	},
	features: [],
	docs: {
		'API Reference - RadioGroup': {
			Properties: [
				{
					Property: {
						text: 'name',
						help: 'The name property that is passed to each RadioButton within the RadioGroup. If not provided, the generated id of the group will be used.'
					},
					Type: 'String',
					Default: 'null'
				},
				{ Property: 'value', Type: 'String', Default: 'null' },
				{ Property: 'label', Type: 'String', Default: 'null' },
				{ Property: 'orientation', Type: 'RadioGroupOrientation', Default: "'horizontal'" }
			],
			Slots: [{ Name: 'default', Props: '-', Notes: "_The related RadioButton's" }]
		},
		'Styling - RadioGroup': {
			'CSS variables': [
				{
					Name: '--st-radio-group-gap',
					Default: '0.25rem',
					Notes: '_The gap between label and items'
				},
				{
					Name: '--st-radio-group-items-horizontal-gap',
					Default: '0.75rem',
					Notes: "_The gap between RadioButton's when horizontal"
				},
				{
					Name: '--st-radio-group-items-vertical-gap',
					Default: '0.5rem',
					Notes: "_The gap between RadioButton's when vertical"
				}
			]
		},
		'API Reference - RadioButton': {
			Properties: [
				{ Property: 'label', Type: 'String', Default: 'null' },
				{ Property: 'value', Type: 'String', Default: 'null' },
				{ Property: 'disabled', Type: 'Boolean', Default: 'false' },
				{ Property: 'required', Type: 'Boolean', Default: 'false' }
			],
			Slots: [{ Name: 'label', Props: ['id', 'label'], Notes: '_Render a custom label' }]
		},
		'Styling - RadioButton': {
			'CSS variables': [
				{
					Name: '--st-radio-button-label-font-size',
					Default: '--st-font-size-base'
				},
				{
					Name: '--st-radio-button-label-font-weight',
					Default: '--st-font-weight-normal'
				},
				{
					Name: '--st-radio-button-label-color',
					Default: '--st-body-text-color'
				},
				{
					Name: '--st-radio-button-indicator-size',
					Default: '--st-box-size'
				},
				{
					Name: '--st-radio-button-indicator-bg-color',
					Default: '--st-box-bg-color'
				},
				{
					Name: '--st-radio-button-indicator-border-color',
					Default: '--st-box-border-color'
				},
				{
					Name: '--st-radio-button-indicator-border-radius',
					Default: '--border-radius-full'
				},
				{
					Name: '--st-radio-button-indicator-selected-bg-color',
					Default: '--st-colors-light1'
				},
				{
					Name: '--st-radio-button-indicator-selected-bg-color',
					Default: '--st-box-selected-bg-color'
				}
			]
		}
	}
}

export const quickstart = `<script>
	import { RadioGroup, RadioButton } from "@steeze-ui/components"
	let stance = "goofy"
</script>

<RadioGroup label="Stance" name="stance" bind:value={stance} orientation="vertical">
	<RadioButton label="Goofy" value="goofy" />
	<RadioButton label="Regular" value="regular" />
</RadioGroup>`

export const examples: ComponentExample[] = []
