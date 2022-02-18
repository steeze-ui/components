import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Theme',
		description: 'Manage light/dark theme in your application',
		color: 5,
		type: 2
	},
	features: [],
	docs: {
		'API Reference': {
			Properties: [
				{
					Property: {
						text: 'fromSystem',
						help: 'Reads the initial theme from the OS'
					},
					Type: 'boolean',
					Default: 'false'
				}
			],
			Stores: [
				{ Name: 'Theme', Type: 'ThemeStore', functions: ['toggle(boolean)', 'fromSystem()'] }
			]
		}
	}
}

export const quickstart = `<script>
  import { ThemeProvider, ThemeToggle } from "@steeze-ui/components"
</script>

<!-- sets the theme class reactively using the Theme store -->
<ThemeProvider fromSystem />

<!-- button component to toggle the theme (can be used anywhere) -->
<ThemeToggle />`

export const examples: ComponentExample[] = []
