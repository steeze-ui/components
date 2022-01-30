<script lang="ts" context="module">
	// import { api as fieldContainerApi } from './field-container.svelte'

	export const api = {
		Properties: [
			// ...fieldContainerApi['Properties'],
			{ Property: 'disabled', Type: 'Boolean', Default: 'false' },
			{
				Property: { text: 'icon', help: 'Icon Source from @steeze-ui/icons' },
				Type: 'IconSource',
				Default: 'null'
			},
			{
				Property: { text: 'iconTheme', help: 'Icon Theme used for the icon' },
				Type: 'String',
				Default: '"default"'
			},
			{
				Property: { Text: 'iconSize', help: 'Size of the Icon' },
				Type: 'String',
				Default: '"20px"'
			},
			{
				Property: { text: 'theme', help: 'Appearance of the button' },
				Type: 'String',
				Default: '"secondary"'
			}
		],
		Slots: [
			{ Name: 'default', Props: '-', Notes: '_Button Content' },
			{ Name: 'prefix', Props: '-', Notes: '_What to render right before the default slot' }
		],
		Events: [{ Name: 'click', Type: '-', Notes: '_Listen when the user clicks' }]
	}

	export const styling = {
		'Custom Properties': [
			{ Name: `--st-button-height`, Default: '--st-field-height' },
			{ Name: `--st-button-padding`, Default: '--st-field-padding' },
			{ Name: `--st-button-font-size`, Default: '--st-field-font-size' },
			{ Name: `--st-button-font-weight`, Default: '--st-field-font-weight' },
			{ Name: `--st-button-color`, Default: '--st-body-text-color' },
			{ Name: `--st-button-bg-color`, Default: 'transparent' },
			{ Name: `--st-button-border-radius`, Default: '--st-field-border-radius' },
			{ Name: `--st-button-border-color`, Default: 'transparent' },
			{ Name: `--st-button-border-width`, Default: '--st-field-border-field' },
			{ Name: `--st-button-transition`, Default: '--st-hover-transition' }
		],
		Themes: [
			{ Name: 'primary', Notes: 'A theme for important buttons', Global: 'false' },
			{ Name: 'secondary', Notes: '-', Global: 'false' },
			{ Name: 'tertiary', Notes: '-', Global: 'false' }
		]
	}
</script>

<script lang="ts">
	import Demo from '$lib/internal/docs/Demo.svelte'
	import Features from '$lib/internal/docs/Features.svelte'
	import Title from '$lib/internal/docs/Title.svelte'
	import Button from '$lib/button/Button.svelte'
	import { Moon, Sun } from '@steeze-ui/heroicons'

	export let id: number
	export let type: number
	export let title: string
	export let description: string

	const features = ['Icon Support', '3 Color Themes', 'Form Ready']
</script>

<Title {title} {type} {description} />

<Demo {id}>
	<Button theme="primary" style="width:8rem">Primary</Button>
	<Button style="width:8rem">Secondary</Button>
	<Button theme="tertiary" style="width:8rem">Tertiary</Button>
	<Button theme="secondary" icon={Moon}>Dark</Button>
	<Button theme="secondary" icon={Sun} />
</Demo>

<Features {features} />
