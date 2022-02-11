<script lang="ts" context="module">
	import { api as fieldContainerApi } from './field-container.svelte'

	export const api = {
		Properties: [
			...fieldContainerApi['Properties'],
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
	}

	export const styling = {
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
			{ Classname: 'st-theme-light', Notes: 'Light Appearance of the Component' },
			{ Classname: 'st-size-small', Notes: 'Smaller Appearance of the Component' }
		]
	}
</script>

<script lang="ts">
	import Demo from '$lib/_internal/docs/Demo.svelte'
	import Features from '$lib/_internal/docs/Features.svelte'

	import Title from '$lib/_internal/docs/Title.svelte'
	import TextField from '$lib/text-field/TextField.svelte'
	import { Heart } from '@steeze-ui/heroicons'
	import { Icon } from '@steeze-ui/svelte-icon'

	export let id: number
	export let type: number
	export let title: string
	export let description: string

	const features = ['Customizable', 'Prefix & Suffix', 'Form Ready']

	let value = ''
	$: theme = value.length > 0 ? 'solid' : 'default'
</script>

<Title {title} {type} {description} />

<Demo {id}>
	<TextField
		placeholder="e.g Tre Flip"
		clearable
		width="12rem"
		label="Favorite Fliptrick"
		bind:value
		helper="A Fliptrick rotates the board around its own axis"
	>
		<Icon {theme} slot="prefix" src={Heart} size="16px" />
	</TextField>
</Demo>

<Features {features} />
