<script lang="ts" context="module">
	// import { api as fieldContainerApi } from './field-container.svelte'

	export const api = {
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
	}

	export const styling = {
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
			{ Classname: 'st-theme-light', Notes: 'Light Appearance of the Component' },
			{ Classname: 'st-size-small', Notes: 'Smaller Appearance of the Component' }
		]
	}
</script>

<script lang="ts">
	import Demo from '$lib/_internal/docs/Demo.svelte'
	import Features from '$lib/_internal/docs/Features.svelte'
	import Title from '$lib/_internal/docs/Title.svelte'

	import Toggle from '$lib/toggle/Toggle.svelte'

	export let id: number
	export let type: number
	export let title: string
	export let description: string
</script>

<Title {title} {type} {description} />

<Demo {id}>
	<Toggle checked />
</Demo>

<Features features={[]} />
