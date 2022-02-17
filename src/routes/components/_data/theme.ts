import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: '?',
		description: '',
		color: 1,
		type: 1
	},
	features: [],
	docs: {
		'API Reference': {
			Properties: [
				{
					Property: {
						text: 'fromSystem',
						help: 'reads the initial theme from the system'
					},
					Type: 'boolean',
					Default: 'false'
				}
			],
			Stores: [
				{ Name: 'theme', Type: 'ThemeStore', functions: ['toggle(boolean)', 'fromSystem()'] }
			]
		}
	}
}

export const quickstart = `<script>
  import { ThemeProvider, ThemeToggle, Theme } from "@steeze-ui/components"
</script>

<ThemeProvider fromSystem />
<ThemeToggle />
{$Theme.isDark ? 'Dark' : 'Light'}`

export const examples: ComponentExample[] = []
