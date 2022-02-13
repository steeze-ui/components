import type { ComponentData, ComponentExample } from '$lib/_internal/types/docs'

export const data: ComponentData = {
	meta: {
		title: 'Flex',
		description: 'Flexible Box Layout',
		color: 8,
		type: 3
	},
	features: [],
	docs: {
		'API Reference': {
			Properties: [
				{ Property: 'display', Type: 'FlexDisplay', Default: "'flex'" },
				{ Property: 'direction', Type: 'FlexDirection', Default: "'row'" },
				{ Property: 'justify', Type: 'FlexJustifyContent', Default: "'flex-start'" },
				{ Property: 'align', Type: 'FlexAlignItems', Default: "'flex-start'" },
				{ Property: 'wrap', Type: 'FlexWrap', Default: "'nowrap'" },
				{ Property: 'flow', Type: 'FlexFlow', Default: 'null' },
				{ Property: 'gap', Type: 'String', Default: 'null' },
				{ Property: 'shrink', Type: 'Number', Default: '1' },
				{ Property: 'grow', Type: 'Number', Default: '0' },
				{ Property: 'basis', Type: 'String', Default: "'auto'" },
				{ Property: '*', Type: '*', Default: '-' }
			],
			Slots: [{ Name: 'Default', Props: [], Notes: '_The content of the Flex Layout' }]
		}
	}
}

export const quickstart = `<script>
  import { Flex } from "@steeze-ui/components"
</script>

<Flex justify="center" align="center">
	Your Items
</Flex>`

export const examples: ComponentExample[] = []
