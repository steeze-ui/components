<script lang="ts" context="module">
	// import { api as fieldContainerApi } from './field-container.svelte'

	export const api = {
		Properties: [
			// ...fieldContainerApi['Properties'],
			{
				Property: {
					text: 'position',
					help: 'Prefered Position of the tooltip'
				},
				Type: 'FloatingPosition',
				Default: '"bottom"'
			},
			{
				Property: {
					text: 'delay',
					help: 'Delay in ms of how long the cursor needs to touch the trigger in order to display the tooltip'
				},
				Type: 'Number',
				Default: '500'
			}
		],
		Slots: [
			{ Name: 'trigger', Props: ['id'], Notes: '_The trigger that initiates the tooltip content' },
			{ Name: 'content', Props: '-', Notes: '_The content to display in the tooltip' }
		],
		Events: [
			{ Name: 'focus', Type: '-', Notes: '_Listen when input gets focus' },
			{ Name: 'blur', Type: '-', Notes: '_Listen when input loses focus' },
			{ Name: 'clear', Type: '{details: {old: String}}', Notes: '_Listen when input clears' }
		]
	}

	export const styling = {
		'Custom Properties': [
			{ Name: '--st-tooltip-padding', Default: '--st-field-padding-sm' },
			{ Name: '--st-tooltip-font-size', Default: '--st-font-size-sm' },
			{ Name: '--st-tooltip-font-weight', Default: '--st-font-weight-normal' },
			{ Name: '--st-tooltip-color', Default: '--st-body-text-color' },
			{ Name: '--st-tooltip-bg-color', Default: '--st-overlay-bg-color' },
			{ Name: '--st-tooltip-border-radius', Default: '--st-overlay-border-radius' }
		]
		// Themes: []
	}
</script>

<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import Demo from '$lib/_internal/docs/Demo.svelte'
	import Features from '$lib/_internal/docs/Features.svelte'
	import Title from '$lib/_internal/docs/Title.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'

	export let id: number
	export let type: number
	export let title: string
	export let description: string
</script>

<Title {title} {type} {description} />

<Demo {id}>
	<Tooltip>
		<Button slot="trigger">Hover Me</Button>
		<span slot="content">Hi There! Iam Content.</span>
	</Tooltip>
</Demo>

<Features features={['Custom Trigger', 'Custom Content', 'Smart Floating Content']} />
