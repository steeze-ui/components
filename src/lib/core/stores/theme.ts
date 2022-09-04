import { browser } from '$app/environment'
import { writable } from 'svelte/store'

function createLightThemeStore() {
	const LOCAL_STORAGE_THEME_KEY = 'theme'
	const isDark = (browser && localStorage.getItem('theme') === 'dark') || false
	const { subscribe, update } = writable({
		isDark: isDark
	})

	return {
		subscribe,
		toggle: () =>
			update((v) => {
				const newThemeValue = !v.isDark
				localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newThemeValue ? 'dark' : 'light')

				return { ...v, isDark: newThemeValue }
			}),
		fromSystem: () =>
			update((v) => {
				if (browser && !localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) {
					const matched = matchMedia('(prefers-color-scheme: dark)').matches
					localStorage.setItem(LOCAL_STORAGE_THEME_KEY, matched ? 'dark' : 'light')
					return { ...v, isDark: matched }
				} else {
					return v
				}
			})
	}
}

export const Theme = createLightThemeStore()
