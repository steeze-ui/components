import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Select',
		description: 'Choose from a set of items',
		color: 2,
		type: 1
	},
	features: [
		'Multiple Select',
		'Searchable',
		'Groupable',
		'Taggable',
		'Screen Reader enhanced',
		'Keyboard support',
		'Customizable'
	],
	docs: {
		'API Reference': {
			Properties: [
				{
					Property: {
						text: 'items',
						help: 'The values to choose from'
					},
					Type: 'SelectItem[]',
					Default: '[]'
				},
				{
					Property: {
						text: 'value',
						help: 'The selected value'
					},
					Type: 'SelectItem',
					Default: 'null'
				},
				{
					Property: {
						text: 'multiple',
						help: 'Allow the user to select multiple items'
					},
					Type: 'Boolean',
					Default: 'false'
				},
				{
					Property: {
						text: 'searchable',
						help: 'Allow the user to search for items'
					},
					Type: 'Boolean',
					Default: 'false'
				},
				{
					Property: {
						text: 'clearable',
						help: 'Allow the user to clear the selected value'
					},
					Type: 'Boolean',
					Default: 'false'
				},
				{
					Property: {
						text: 'groupBy',
						help: 'Group Items by a given key'
					},
					Type: '(item:T) => string',
					Default: 'null'
				},
				{
					Property: {
						text: 'filterBy',
						help: 'When searchable, define a custom filter function. By default it uses the label.'
					},
					Type: '(item:T, searchText:string) => boolean',
					Default: 'null'
				},
				{
					Property: {
						text: 'taggable',
						help: 'Allow input that is not present within the items'
					},
					Type: '(value: string) => T',
					Default: 'null'
				},
				{
					Property: {
						text: 'pushTags',
						help: 'Push created Tags into the items'
					},
					Type: 'Boolean',
					Default: 'false'
				},
				{
					Property: {
						text: 'retainOnSelect',
						help: 'Retains the Selector open when an item is selected. Useful when multiple is true'
					},
					Type: 'Boolean',
					Default: 'false'
				},
				{
					Property: {
						text: 'loop',
						help: 'Allow to loop when using the Arrows to navigate through the items'
					},
					Type: 'Boolean',
					Default: 'false'
				},
				{
					Property: {
						text: 'label',
						help: 'Label above the field'
					},
					Type: 'String',
					Default: "''"
				},
				{
					Property: {
						text: 'helper',
						help: 'Helper Text below the field'
					},
					Type: 'String',
					Default: "''"
				},
				{
					Property: {
						text: 'placeholder',
						help: 'What to show when no value is selected'
					},
					Type: 'String',
					Default: "''"
				},
				{
					Property: {
						text: 'itemLabelRenderer',
						help: 'How to represent the value'
					},
					Type: '(e:T) => string',
					Default: "e => e?.['label'] ?? '"
				},
				{
					Property: {
						text: 'position',
						help: 'Prefered initial position of the floating menu'
					},
					Type: 'FloatingPosition',
					Default: "'bottom'"
				},
				{
					Property: {
						text: 'width',
						help: 'Width of the container'
					},
					Type: 'String',
					Default: "'12rem'"
				},
				{
					Property: {
						text: 'focus',
						help: 'Focus when the component mounts'
					},
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
						text: '*',
						help: 'All the rest is applied to the input container'
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
				},
				{
					Name: 'item',
					Props: ['id', 'item', 'label', 'focused', 'selected', 'onFocus()', 'onSelect()'],
					Notes: '_Replaces the default menu item'
				}
			],
			Events: [
				{
					Name: 'focus',
					Type: '-',
					Notes: '_Listen when input gets focus'
				},
				{
					Name: 'blur',
					Type: '-',
					Notes: '_Listen when input loses focus'
				},
				{
					Name: 'clear',
					Type: '{details: {old: String}}',
					Notes: '_Listen when input clears'
				}
			]
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
					Name: '--st-select-search-color',
					Default: '--st-field-color'
				},
				{
					Name: '--st-select-search-font-size',
					Default: '--st-field-font-size'
				},
				{
					Name: '--st-select-search-font-weight',
					Default: '--st-field-font-weight'
				},
				{
					Name: '--st-select-button-size',
					Default: '--st-field-button-size'
				},
				{
					Name: '--st-select-button-color',
					Default: '--st-field-button-color'
				},
				{
					Name: '--st-select-tags-gap',
					Default: '0.325rem'
				},
				{
					Name: '--st-select-tag-padding',
					Default: '0 0.325rem'
				},
				{
					Name: '--st-select-tag-border-radius',
					Default: '--st-border-radius-sm'
				},
				{
					Name: '--st-select-tag-font-size',
					Default: '--st-font-size-sm'
				},
				{
					Name: '--st-select-tag-font-weight',
					Default: '--st-field-font-weight'
				},
				{
					Name: '--st-select-tag-color',
					Default: '--st-field-color'
				},
				{
					Name: '--st-select-tag-bg-color',
					Default: '--st-tag-bg-color'
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
	import { Select } from '@steeze-ui/components'

	const items = [
		{ label: 'First' },
		{ label: 'Second' }
	] 
</script>

<Select {items} value="{items[0]}" />`

export const examples: ComponentExample[] = [
	{
		title: 'Custom Value Renderer',
		description:
			'Changes how the label will be rendered for the Input and Selector Items. This is needed in case where your item object has no label property',
		source: `<script>
  const items = [{value:"value 1"}]
</script>

<Select {items} itemLabelRenderer={(e)=>\`Item: \${e.value}\`} />`
	},
	{
		title: 'Custom Selector Item',
		description:
			"Render a completely custom Menu Item using the item slot and its let: properties. Don't forget to apply the id, to make it accessible for screen readers",
		source: `<Select {items}>
  <p
    slot="item"
    let:id let:item let:label
    let:focused let:selected
    let:onSelect let:onFocus
    {id}
    on:pointerdown={onSelect}
    on:pointerover={onFocus}
    style:background-color={focused ? "blue" : "" }
    style:color={selected ? "red" : "" }
  >
    {label}
  </p>
</Select>`
	},
	{
		title: 'Grouping Items',
		description: 'Sort items by Grouping them together.',
		source: `<script>
  const items = [
    {value:"Value 1",group:"Group 1"},
    {value:"Value 2",group:"Group 2"},
    {value:"Value 3",group:"Group 2"},
  ]
</script>

<Select {items} groupBy={(e)=>e.group} />`
	}
]
