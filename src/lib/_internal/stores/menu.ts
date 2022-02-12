import { readable } from 'svelte/store'

const menuMap = {
	Overview: {
		Introduction: '/',
		'Getting Started': '/overview/getting-started',
		Styling: '/overview/styling',
		Accessibility: '/overview/accessibility'
	},
	Components: {
		'Form Input': {
			Select: '/components/select',
			'Combo Box': '__/components/combo-box',
			'Radio Group': '_/components/radio-group',
			Checkbox: '_/components/checkbox',
			'Text Field': '/components/text-field',
			'Number Field': '__/components/number-field',
			'Text Area': '/components/text-area',
			Toggle: '/components/toggle'
		},
		'Visualization & Interaction': {
			Button: '/components/button',
			Tooltip: '/components/tooltip',
			Popover: '/components/popover',
			Grid: '__/components/grid',
			Carousel: '__/components/carousel',
			Details: '__/components/details',
			'Dropdown Menu': '__/components/dropdown-menu',
			Tabs: '_/components/tabs',
			Accordion: '__/components/accordion',
			Notification: '_/components/notification',
			Dialog: '_/components/dialog'
		},
		Layouts: {
			Flex: '_/components/flex',
			Split: '__/components/split',
			Scrollable: '__/components/scrollable'
		}
	},
	Icons: {
		About: '/icons',
		'Icon Packs': '/icons/packs',
		'Icon Components': '/icons/components'
	}
}

const unorderedComponentsMap = {
	...menuMap['Components']['Form Input'],
	...menuMap['Components']['Visualization & Interaction'],
	...menuMap['Components']['Layouts']
}

const orderedComponentsMap = Object.keys(unorderedComponentsMap)
	.sort()
	.filter((key) => !unorderedComponentsMap[key].startsWith('_'))
	.reduce((obj, key) => {
		obj[key] = unorderedComponentsMap[key]
		return obj
	}, {})

const menuFlat = {
	...menuMap['Overview'],
	...orderedComponentsMap,
	...menuMap['Icons']
}

const createMenuStore = () => {
	const store = readable(menuMap)

	return {
		subscribe: store.subscribe,
		flat: () => menuFlat
	}
}

export const menu = createMenuStore()
