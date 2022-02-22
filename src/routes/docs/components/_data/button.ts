import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: { color: 0, type: 2, title: 'Button', description: 'Click for Action' },
	features: ['Icon Support', '3 Color Themes', 'Form Ready'],
	docs: {
		'API Reference': {
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
		},
		Styling: {
			'CSS variables': [
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
	}
}

export const quickstart = `<script>
	import { Button } from '@steeze-ui/components'
</script>

<Button
	theme="primary"
	on:click={()=>console.log("clicked!")}
>Click Me</Button>`

export const examples: ComponentExample[] = [
	{
		title: 'Use with icon',
		description: 'You can use any Icon from any Icon Pack',
		source: `<script>
  import { Moon } from '@steeze-ui/heroicons'
  import { Button } from '@steeze-ui/components'
</script>

<Button icon={Moon} iconTheme="solid" />`
	}
]
