import { browser } from '$app/env'
import { writable } from 'svelte/store'

function createLightThemeStore() {
	const isLight = (browser && localStorage.getItem('theme') === 'light') || false
	const { subscribe, update } = writable(isLight)

	return {
		subscribe,
		toggle: () =>
			update((v) => {
				const value = !v
				localStorage.setItem('theme', value ? 'light' : 'dark')
				return value
			})
	}
}

export const lightTheme = createLightThemeStore()
