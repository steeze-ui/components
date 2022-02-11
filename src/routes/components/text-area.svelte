<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Tabs from '$lib/tabs/Tabs.svelte'
	import Component, { Example, Feature, Meta } from '$lib/_internal/docs/Component.svelte'

	const meta: Meta = {
		title: 'Tabs',
		description: 'Display content depending on the selected Tab',
		color: 19,
		type: 2
	}

	const features: Feature[] = []

	const quickstart = ''
	// 	`<script>
	// 	import {Tabs} from "@steeze-ui/components"
	// </script${'>'}

	// <Tabs />`

	const docs = {
		'API Reference': {
			Properties: [
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
		},
		Styling: {
			'CSS variables': [{ Name: '--st-text-field-color', Default: '--st-field-color' }],
			Themes: [
				{ Name: 'small', Notes: 'Smaller Appearance of the Component', Global: 'true' },
				{ Name: 'borderless', Notes: 'Renders without a border', Global: 'true' }
			]
		}
	}

	const examples: Example[] = []
</script>

<Component {meta} {features} {quickstart} {docs} {examples}>
	<Tabs />
</Component>
