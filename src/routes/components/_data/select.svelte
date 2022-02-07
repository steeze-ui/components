<script lang="ts" context="module">
	export const api = {
		Properties: [
			{
				Property: {
					text: 'identifier',
					help: 'Unique identifier of the item, used for internal calculations'
				},
				Type: 'String',
				Default: '"id"'
			},
			{
				Property: { text: 'items', help: 'The values to choose from' },
				Type: 'SelectItem[]',
				Default: '[]'
			},
			{
				Property: { text: 'value', help: 'The selected value' },
				Type: 'SelectItem',
				Default: 'null'
			},
			{
				Property: { text: 'groupBy', help: 'Group Items by a given key' },
				Type: '(e:T) => string',
				Default: 'null'
			},
			{
				Property: { text: 'searchable', help: 'Allow the user to search for items' },
				Type: 'Boolean',
				Default: 'false'
			},
			{
				Property: { text: 'clearable', help: 'Allow the user to clear the selected value' },
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
			{ Property: { text: 'label', help: 'Label above the field' }, Type: 'String', Default: '""' },
			{
				Property: { text: 'helper', help: 'Helper Text below the field' },
				Type: 'String',
				Default: '""'
			},
			{
				Property: { text: 'placeholder', help: 'What to show when no value is selected' },
				Type: 'String',
				Default: '""'
			},
			{
				Property: { text: 'itemLabelRenderer', help: 'How to represent the value' },
				Type: '(e:T) => string',
				Default: 'e => e?.["label"] ?? ""'
			},
			{
				Property: { text: 'position', help: 'Prefered initial position of the floating menu' },
				Type: 'FloatingPosition',
				Default: '"bottom"'
			},
			{
				Property: { text: 'width', help: 'Width of the container' },
				Type: 'String',
				Default: '"12rem"'
			},
			{
				Property: { text: 'focus', help: 'Focus when the component mounts' },
				Type: 'Boolean',
				Default: 'false'
			},
			{
				Property: { text: 'name', help: 'Name property for forms' },
				Type: 'String',
				Default: '""'
			},
			{
				Property: { text: 'disabled', help: 'If the user can change the value' },
				Type: 'Boolean',
				Default: 'false'
			}
		],
		Slots: [
			{ Name: 'label', Props: '-', Notes: '_Place a custom label above the field' },
			{ Name: 'helper', Props: '-', Notes: '_Place a custom helper below the field' },
			{
				Name: 'item',
				Props: ['id', 'item', 'label', 'focused', 'selected', 'onFocus()', 'onSelect()'],
				Notes: '_Replaces the default menu item'
			}
		],
		Events: [
			{ Name: 'focus', Type: '-', Notes: '_Listen when input gets focus' },
			{ Name: 'blur', Type: '-', Notes: '_Listen when input loses focus' },
			{ Name: 'clear', Type: '{details: {old: String}}', Notes: '_Listen when input clears' }
		]
	}

	export const styling = {
		'Custom Properties': [
			{ Name: '--st-text-field-color', Default: '--st-field-color' },
			{ Name: '--st-select-active-bg-color', Default: '--st-colors-gray10' },
			{ Name: '--st-select-font-size', Default: '--st-field-font-size' },
			{ Name: '--st-select-font-weight', Default: '--st-field-font-weight' },
			{ Name: '--st-select-color', Default: '--st-field-color' },
			{ Name: '--st-tooltip-bg-color', Default: '--st-overlay-bg-color' },
			{ Name: '--st-tooltip-border-radius', Default: '--st-overlay-border-radius' }
		],
		Themes: [
			{ Name: 'light', Notes: 'Light Appearance of the Component' },
			{ Name: 'small', Notes: 'Smaller Appearance of the Component' },
			{ Name: 'borderless', Notes: 'Renders without a border' },
			{ Name: 'transparent', Notes: 'Renders without a background color' }
		],
		Globals: [
			{ Classname: 'st-theme-light', Notes: 'Light Appearance of the Component' },
			{ Classname: 'st-size-small', Notes: 'Smaller Appearance of the Component' }
		]
	}
</script>

<script lang="ts">
	import Demo from '$lib/internal/docs/Demo.svelte'
	import Features from '$lib/internal/docs/Features.svelte'
	import Title from '$lib/internal/docs/Title.svelte'
	import Select from '$lib/select/Select.svelte'

	export let id: number
	export let type: number
	export let title: string
	export let description: string

	const items = [
		{ id: '1', label: 'Hot' },
		{ id: '2', label: 'New' }
	]
	const itemsWithGroup = [
		{ id: '1', label: 'Flatrail', group: 'Rails' },
		{ id: '2', label: 'Handrail', group: 'Rails' },
		{ id: '3', label: 'Wallbank', group: 'Bank' },
		{ id: '4', label: 'Speedbank', group: 'Bank' },
		{ id: '5', label: 'A-Frame', group: 'Funbox' },
		{ id: '6', label: 'Pyramid', group: 'Funbox' }
	]

	const groupBy = (e) => {
		return e.group as string
	}
</script>

<Title {title} {type} {description} />

<Demo {id}>
	<Select label="Filter by" width="12rem" {items} />
	<Select
		width="12rem"
		loop
		searchable
		clearable
		groupBy={(e) => e.group}
		placeholder="Choose Obstacle.."
		items={itemsWithGroup}
	/>
</Demo>

<Features
	features={[
		'Keyboard support',
		'Screen Reader capable',
		'Searchable',
		'Groupable',
		'Custom Renderers'
	]}
/>
