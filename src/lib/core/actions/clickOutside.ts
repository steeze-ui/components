import type { Action } from '$lib/core/types'

/**
 *
 * Call callback when user clicks outside a given element
 *
 * Usage:
 * <div use:clickOutside={{ enabled: open, cb: () => open = false }}>
 *
 * Demo: https://svelte.dev/repl/dae848c2157e48ab932106779960f5d5?version=3.19.2
 *
 */
export function clickOutside(
	node: HTMLElement,
	params: {
		enabled: boolean
		cb: () => void
		exclude?: (HTMLElement | undefined)[]
	}
): ReturnType<Action> {
	const { enabled: initialEnabled, cb, exclude } = params

	const handleOutsideClick = ({ target }: MouseEvent) => {
		if (exclude) {
			if (exclude.some((e) => e?.contains(target as HTMLElement))) return

			// if (exclude.contains(target as HTMLElement)) {
			// 	return
			// }
		}
		if (!node.contains(target as Node)) {
			cb()
		}
	}

	function update(props: UpdateParams | unknown) {
		if ((props as UpdateParams).enabled) {
			window.addEventListener('click', handleOutsideClick)
		} else {
			window.removeEventListener('click', handleOutsideClick)
		}
	}

	update({ enabled: initialEnabled })

	return {
		update,
		destroy() {
			window.removeEventListener('click', handleOutsideClick)
		}
	}
}

type UpdateParams = { enabled: boolean }
