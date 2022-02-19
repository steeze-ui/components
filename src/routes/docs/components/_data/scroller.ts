import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Scroller',
		description: 'Observe the currently visible Section of the Scroller',
		color: 6,
		type: 2
	},
	features: ['Intersection Observer', 'Lazyload Sections'],
	docs: {
		'API Reference - Scroller': {
			Properties: [
				{
					Property: {
						text: 'threshhold',
						help: 'At what percentage of the targets visibility the Scroller should load the Section'
					},
					Type: 'Number',
					Default: '0.5'
				},
				{
					Property: {
						text: 'section (Readonly)',
						help: 'The Section that is currently active by the Scroller'
					},
					Type: 'Writable<String>',
					Default: '-'
				},
				{
					Text: '*',
					Type: '*',
					Default: '-'
				}
			],
			Slots: [{ Name: 'default', Props: [], Notes: '_Sections' }]
		},
		'API Reference - Section': {
			Properties: [
				{
					Property: {
						text: 'id',
						help: 'The unique identifier of the Section'
					},
					Type: 'String',
					Default: '-'
				},
				{
					Property: {
						text: 'lazyload',
						help: 'Whether the Section should be lazyloaded'
					},
					Type: 'Boolean',
					Default: 'false'
				},
				{
					Text: '*',
					Type: '*',
					Default: '-'
				}
			],
			Slots: [
				{ Name: 'default', Props: [], Notes: '_Section Content' },
				{
					Name: 'placeholder',
					Props: [],
					Notes: '_What to display when the section is not loaded yet'
				}
			]
		}
	}
}

export const quickstart = `<script>
	import { Scroller, Section } from '@steeze-ui/components'
</script>

<Scroller>
	<Section id="section-1"> Content 1 </Section>
	<Section id="section-2" lazyload> Content 2 </Section>
	<Section id="section-3"> Content 3 </Section>
</Scroller>`

export const examples: ComponentExample[] = []
