import type { ComponentData } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Toggle',
		description: 'Switch a value betwenn two states',
		color: 3,
		type: 1
	},
	features: ['Customizable', 'Prefix & Suffix', 'Form Ready'],
	docs: {
		'API Reference': {
			Properties: [
				{ Property: 'width', Type: 'String', Default: '12rem' },
				{ Property: 'label', Type: 'String', Default: 'null' },
				{ Property: 'helper', Type: 'String', Default: 'null' },
				{ Property: 'theme', Type: 'String', Default: 'null' }
			]
		}
	}
}
