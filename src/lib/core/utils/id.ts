let id = -1
export const getId = (): string => {
	id++
	return `steeze-${id}`
}
