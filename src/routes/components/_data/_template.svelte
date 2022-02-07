<script lang="ts" context="module">
	// import { api as fieldContainerApi } from './field-container.svelte'

	export const api = {
		Properties: [
			// ...fieldContainerApi['Properties'],
			{ Property: 'name', Type: 'String', Default: 'null' },
			{ Property: 'value', Type: 'String', Default: '""' }
		],
		Slots: [
			{ Name: 'label', Props: ['id', 'htmlfor'], Notes: '_-' },
			{ Name: 'helper', Props: ['id', 'htmlfor'], Notes: '_-' }
		],
		Events: [
			{ Name: 'focus', Type: '-', Notes: '_Listen when input gets focus' },
			{ Name: 'blur', Type: '-', Notes: '_Listen when input loses focus' },
			{ Name: 'clear', Type: '{details: {old: String}}', Notes: '_Listen when input clears' }
		]
	}

	export const styling = {
		'Custom Properties': [{ Name: '--st-text-field-color', Default: '--st-field-color' }],
		Themes: [
			{ Name: 'small', Notes: 'Smaller Appearance of the Component', Global: 'true' },
			{ Name: 'borderless', Notes: 'Renders without a border', Global: 'true' }
		]
	}
</script>

<script lang="ts">
	import Demo from '$lib/_internal/docs/Demo.svelte'
	import Features from '$lib/_internal/docs/Features.svelte'
	import Title from '$lib/_internal/docs/Title.svelte'

	export let id: number
	export let type: number
	export let title: string
	export let description: string

	const features = ['Customizable', 'Prefix & Suffix', 'Form Ready']
</script>

<Title {title} {type} {description} />

<Demo {id} />

<Features {features} />
