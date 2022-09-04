import type { NotificationItem, NotificationOptions } from '$lib/types'
import { writable } from 'svelte/store'

function createNotificationStore() {
	let id = 0
	const { update, subscribe } = writable({
		duration: 5000,
		items: [] as NotificationItem[]
	})

	return {
		subscribe: subscribe,
		show: (item: NotificationItem, options?: NotificationOptions) =>
			update((n) => {
				id++
				item.id = id
				setTimeout(() => {
					update((n) => ({ ...n, items: n.items.filter((i) => i !== item) }))
				}, options?.duration ?? n.duration)
				return { ...n, items: [item, ...n.items] }
			}),
		setDuration: (duration: number) => update((n) => ({ ...n, duration })),
		close: (item: NotificationItem) =>
			update((n) => ({ ...n, items: n.items.filter((i) => i !== item) }))
	}
}

export const Notification = createNotificationStore()
