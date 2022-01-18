import { tick } from 'svelte'
import type { Action } from '$lib/core/types'

export function portal(el: HTMLElement, target: string | Element = 'body'): ReturnType<Action> {
	let targetEl: HTMLElement
	async function update(newTarget: string | Element) {
		target = newTarget
		if (typeof target === 'string') {
			targetEl = document.querySelector(target)
			if (targetEl === null) {
				await tick()
				targetEl = document.querySelector(target)
			}
			if (targetEl === null) {
				throw new Error(`No element found matching css selector: "${target}"`)
			}
		} else {
			throw new TypeError(
				`Unknown portal target type: ${
					target === null ? 'null' : typeof target
				}. Allowed types: string (CSS selector) or HTMLElement.`
			)
		}
		targetEl.appendChild(el)
		el.hidden = false
	}

	function destroy() {
		if (el.parentNode) {
			el.parentNode.removeChild(el)
		}
	}
	update(target)
	return {
		update,
		destroy
	}
}
