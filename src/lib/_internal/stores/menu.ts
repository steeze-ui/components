import { writable } from 'svelte/store'

const menuMap = {
	Overview: {
		Introduction: '/docs/overview/introduction',
		'Getting Started': '/docs/overview/getting-started',
		Styling: '/docs/overview/styling',
		Accessibility: '/docs/overview/accessibility'
	},
	Components: {
		'Form Input': {
			Select: '/docs/components/select',
			'Combo Box': '_/docs/components/combo-box',
			'Radio Group': '/docs/components/radio-group',
			Checkbox: '_/docs/components/checkbox',
			'Text Field': '/docs/components/text-field',
			'Number Field': '__/docs/components/number-field',
			'Text Area': '/docs/components/text-area',
			Toggle: '/docs/components/toggle'
		},
		'Visualization & Interaction': {
			Button: '/docs/components/button',
			Popover: '/docs/components/popover',
			Tooltip: '/docs/components/tooltip',
			Tabs: '/docs/components/tabs',
			Dialog: '/docs/components/dialog',
			Notification: '/docs/components/notification',
			Theme: '/docs/components/theme',
			Scroller: '/docs/components/scroller',
			Accordion: '_/docs/components/accordion',
			Carousel: '__/docs/components/carousel',
			Grid: '__/docs/components/grid',
			Details: '_/docs/components/details',
			'Dropdown Menu': '__/docs/components/dropdown-menu'
		},
		Layouts: {
			Flex: '/docs/components/flex',
			Split: '_/docs/components/split',
			Scrollable: '__/docs/components/scrollable'
		}
	},
	Icons: {
		About: '/docs/icons',
		'Icon Packs': '/docs/icons/packs',
		'Icon Components': '/docs/icons/components'
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
	const { subscribe, update } = writable({
		map: menuMap,
		opened: false
	})

	return {
		subscribe: subscribe,
		flat: () => menuFlat,
		setOpened: (value: boolean) => update((state) => ({ ...state, opened: value })),
		toggleOpened: () => update((state) => ({ ...state, opened: !state.opened }))
	}
}

export const menu = createMenuStore()
