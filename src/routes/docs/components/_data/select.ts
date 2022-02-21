import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Select',
		description: 'Choose from a set of items',
		color: 2,
		type: 1
	},
	features: [
		'Keyboard support',
		'Screen Reader capable',
		'Searchable',
		'Groupable',
		'Custom Renderers'
	],
	docs: {
		'API Reference': {
			Properties: [
				{
					Property: {
						text: 'identifier',
						help: 'Unique identifier of the item, used for internal calculations'
					},
					Type: 'String',
					Default: "'id'"
				},
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
						text: 'searchable',
						help: 'Allow the user to search for items'
					},
					Type: 'Boolean',
					Default: 'false'
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
						text: 'clearable',
						help: 'Allow the user to clear the selected value'
					},
					Type: 'Boolean',
					Default: 'false'
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
				}
			],
			Slots: [
				{
					Name: 'label',
					Props: '-',
					Notes: '_Place a custom label above the field'
				},
				{
					Name: 'helper',
					Props: '-',
					Notes: '_Place a custom helper below the field'
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
					Name: '--st-text-field-color',
					Default: '--st-field-color'
				},
				{
					Name: '--st-select-active-bg-color',
					Default: '--st-colors-gray10'
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
					Name: '--st-select-color',
					Default: '--st-field-color'
				},
				{
					Name: '--st-tooltip-bg-color',
					Default: '--st-overlay-bg-color'
				},
				{
					Name: '--st-tooltip-border-radius',
					Default: '--st-overlay-border-radius'
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
					Classname: 'st-size-small',
					Notes: 'Smaller Appearance of the Component'
				}
			]
		}
	}
}

export const quickstart = `<script>
  import { Select } from '@steeze-ui/components'

  const items = [
    { id: '1', label: 'First Item' },
    { id: '2', label: 'Second Item' }
  ]
</script>

<Select {items} value="{items[0]}" />`

export const examples: ComponentExample[] = [
	{
		title: 'Custom Value Renderer',
		description:
			'Changes how the label will be rendered for the Input and Selector Items. This is needed in case where your item object has no label property',
		source: `<script>
  const items = [{id:"1",value:"value 1"}]
</script>

<Select {items} itemLabelRenderer={(e)=>\`Item: \${e.value}\`} />`
	},
	{
		title: 'Custom Identifier',
		description:
			'In case your item object comes with a different identifier you can change the default identifier of id to your needs',
		source: `<script>
  const items = [{key:"1",label:"value 1"}]
</script>

<Select {items} identifier="key" />`
	},
	{
		title: 'Custom Label Renderer',
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
    {id:"1",value:"Value 1",group:"Group 1"},
    {id:"2",value:"Value 2",group:"Group 2"},
    {id:"3",value:"Value 3",group:"Group 2"},
  ]
</script>

<Select {items} groupBy={(e)=>e.group} />`
	}
]
