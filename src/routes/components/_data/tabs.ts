import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Tabs',
		description: 'Display content depending on the selected Tab',
		color: 13,
		type: 2
	},
	features: [],
	docs: {
		'API Reference': {
			Properties: [
				{ Property: 'items', Type: 'Tab[]', Default: '-' },
				{ Property: 'selected', Type: 'Number', Default: '0' }
			],
			Slots: [
				{
					Name: 'default',
					Props: ['id', 'tabindex', 'isActive', 'item', 'setSelected()'],
					Notes: '_-'
				}
			],
			Events: [
				{ Name: 'selectedChange', Type: 'Tab', Notes: '_Listen when selected tab change' },
				{ Name: 'selectedIndexChange', Type: 'Number', Notes: '_Listen when selected tab change' }
			]
		},
		Styling: {
			'CSS variables': [
				{ Name: '--st-tabs-hover-border-color', Default: '--st-colors-gray9' },
				{ Name: '--st-tabs-active-color', Default: '--st-colors-primary3' },
				{ Name: '--st-tabs-active-line-color', Default: '--st-colors-primary4' }
			],
			Themes: [
				// { Name: 'small', Notes: 'Smaller Appearance of the Component', Global: 'true' },
				// { Name: 'borderless', Notes: 'Renders without a border', Global: 'true' }
			]
		}
	}
}

export const quickstart = `<script>
  import {Tabs} from "@steeze-ui/components"
</script>

<Tabs items={[ {title: "Tab 2"}, {title: "Tab 2"} ]} />`

export const examples: ComponentExample[] = [
	{
		title: 'Use with custom Tab',
		description: 'You can use a completly custom tab instead of the default one',
		source: `<script>
	import { Tabs } from '@steeze-ui/components'
</script>	

<Tabs items={[ {title: "Tab 2"}, {title: "Tab 2"} ]}>
	<button 
		slot="tab" 
		role="tab" 
		let:id let:item let:isActive let:setSelected 
		{id} aria-selected={isActive} 
		tabindex={isActive ? 0 : -1} 
		on:click={setSelected} 
		style:color={isActive ? "blue" : "black"}
	>
		{item.title}
	</button>
</Tabs>`
	}
]
