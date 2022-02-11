export interface ComponentData {
	meta: {
		title: string
		color: number
		type: 1 | 2 | 3
		description: string
	}
	docs: { [section: string]: { [tab: string]: { [column: string]: any }[] } }
	features: string[]
}

export interface ComponentExample {
	title: string
	description?: string
	source: string
}
