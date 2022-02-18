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
			'Combo Box': '_/components/combo-box',
			'Radio Group': '/components/radio-group',
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
			Details: '_/components/details',
			'Dropdown Menu': '__/components/dropdown-menu',
			Tabs: '/components/tabs',
			Theme: '/components/theme',
			Accordion: '_/components/accordion',
			Notification: '/components/notification',
			Dialog: '/components/dialog'
		},
		Layouts: {
			Flex: '/components/flex',
			Split: '_/components/split',
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
