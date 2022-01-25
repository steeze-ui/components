interface TooltipProps {
	text: string
	show?: boolean
	position?: 'left' | 'right' | 'bottom'
	alignment?: 'start' | 'end' | 'center'
}

export function tooltip(node: HTMLElement, props: TooltipProps) {
	const position = props.position || 'right'
	const alignment = props.alignment || 'center'
	// console.log(props.text, props.show, props.show == undefined)

	// const show = props.show == undefined ? true : props.show
	if (props.show === undefined ? true : props.show) {
		const duration = 500
		let timer: NodeJS.Timeout
		let show = false
		let tooltip: HTMLDivElement

		const createTooltip = (): HTMLDivElement => {
			const div: HTMLDivElement = document.createElement('div')
			div.classList.add(
				'w-max',
				'flex',
				'flex-wrap',
				'items-center',
				'justify-center',
				'rounded-md',
				'px-2',
				'shadow',
				'bg-dark-600',
				'border',
				'border-dark-300',
				'py-1',
				'absolute',
				'z-20'
			)
			const text: HTMLElement = document.createElement('span')
			text.innerHTML = props.text
			text.classList.add('text-gray-300', 'text-sm', 'font-normal')
			div.appendChild(text)

			return div
		}

		const handlePointerEnter = () => {
			timer = setTimeout(() => {
				const nodeRect = node.getBoundingClientRect()
				tooltip = document.body.appendChild(createTooltip())

				switch (position) {
					case 'right':
						tooltip.style.left = nodeRect.x + nodeRect.width + 5 + 'px'
						switch (alignment) {
							case 'center':
								tooltip.style.top =
									nodeRect.y + nodeRect.height / 2 - tooltip.offsetHeight / 2 + 'px'
								break
							case 'start':
								tooltip.style.top = nodeRect.y + 'px'
								break
							case 'end':
								tooltip.style.top =
									nodeRect.y + nodeRect.height - tooltip.offsetHeight + 'px'
								break

							default:
								break
						}
						break
					case 'bottom':
						tooltip.style.top = nodeRect.y + nodeRect.height + 5 + 'px'
						switch (alignment) {
							case 'start':
								tooltip.style.left = nodeRect.x + 'px'
								break
							case 'center':
								tooltip.style.left =
									nodeRect.x - tooltip.offsetWidth / 2 + nodeRect.width / 2 + 'px'
								break
							case 'end':
								tooltip.style.left =
									nodeRect.x - tooltip.offsetWidth + nodeRect.width + 'px'
								break

							default:
								break
						}
						break
					case 'left':
						tooltip.style.left = nodeRect.x - tooltip.offsetWidth - 5 + 'px'
						switch (alignment) {
							case 'center':
								tooltip.style.top =
									nodeRect.y + nodeRect.height / 2 - tooltip.offsetHeight / 2 + 'px'
								break
							case 'start':
								tooltip.style.top = nodeRect.y + 'px'
								break
							case 'end':
								tooltip.style.top =
									nodeRect.y + nodeRect.height - tooltip.offsetHeight + 'px'
								break

							default:
								break
						}
						break

					default:
						break
				}
				show = true
			}, duration)
		}

		const handlePointerLeave = () => {
			clearTimeout(timer)
			if (show) {
				document.body.removeChild(tooltip)
				show = false
			}
		}

		node.addEventListener('pointerenter', handlePointerEnter)
		node.addEventListener('pointerleave', handlePointerLeave)

		return {
			update(newValue: string[]) {
				props = { ...props, ...newValue }
			},
			destroy() {
				node.removeEventListener('pointerenter', handlePointerEnter)
				node.removeEventListener('pointerleave', handlePointerLeave)
			}
		}
	}
}
