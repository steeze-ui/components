export interface SelectValue {
	id?: string
	label?: string
	[key: string]: unknown
}

export type SelectValueMap = {
	[key: string]: { label: string }
}

export type FloatingPosition =
	| 'top'
	| 'bottom'
	| 'left'
	| 'right'
	| 'top-start'
	| 'top-end'
	| 'bottom-start'
	| 'bottom-end'
	| 'left-start'
	| 'left-end'
	| 'right-start'
	| 'right-end'
