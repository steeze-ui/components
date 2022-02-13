export type Action = (
	node: HTMLElement,
	parameters: Record<string, unknown>
) => {
	update?: (parameters: unknown) => void | Promise<void>
	destroy?: () => void
}
