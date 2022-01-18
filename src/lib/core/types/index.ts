import type { IconSource } from '@steeze-ui/svelte-icon/types'

export type Action = (
	node: HTMLElement,
	parameters: Record<string, unknown>
) => {
	update?: (parameters: unknown) => void | Promise<void>
	destroy?: () => void
}

//? Select
export interface SelectValue {
	id?: string
	label?: string
	[key: string]: unknown
}

export type SelectValueMap = {
	[key: string]: { label: string; icon?: IconSource }
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
