import PrismJS from 'prismjs'

export function getHighlighted(source: string) {
	return PrismJS.highlight(source, PrismJS.languages.svelte, 'svelte')
}
