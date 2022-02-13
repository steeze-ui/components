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
				{ Property: '', Type: '', Default: '' },
				{
					Property: {
						text: '',
						help: ''
					},
					Type: '',
					Default: ''
				}
			],
			Slots: [
				{ Name: '', Props: [], Notes: '_-' },
				{ Name: '', Props: [], Notes: '_-' }
			],
			Events: [
				{ Name: '', Type: '', Notes: '' },
				{ Name: '', Type: '', Notes: '' }
			]
		},
		Styling: {
			'CSS variables': [
				{ Name: '', Default: '' },
				{ Name: '', Default: '' }
			],
			Themes: [{ Name: '', Notes: '', Global: '' }]
		}
	}
}

export const quickstart = `<script>
  import {?} from "@steeze-ui/components"
</script>

<? />`

export const examples: ComponentExample[] = []
