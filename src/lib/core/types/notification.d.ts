export interface NotificationItem {
	title?: string
	description?: string
	type?: 'error' | 'success' | 'warning' | 'info'
	[key: string]: unknown
}

export interface NotificationOptions {
	duration?: number
}
