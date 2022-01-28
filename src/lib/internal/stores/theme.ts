import { writable } from 'svelte/store'

function createLightThemeStore() {
	const { subscribe, update } = writable(false)

	return {
		subscribe,
		toggle: () => update((v) => !v),
		set: (v) => update(() => v)
	}
}

export const lightTheme = createLightThemeStore()
