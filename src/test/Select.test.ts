/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cleanup, render, fireEvent } from '@testing-library/svelte'
//@ts-ignore
import Select from '../lib/select/Select.svelte'
import { describe, it, expect, afterEach } from 'vitest'

describe('Select.svelte', () => {
	afterEach(() => cleanup())

	it('Mounted', () => {
		const { container } = render(Select)
		expect(container).toBeTruthy()
	})
	it('get Select', () => {
		const { container } = render(Select, { items: [] })
		// expect(container.innerHTML).toContain('With Prop')
		expect(container.querySelector('#paragraph').innerHTML).toContain('With Prop')
	})
	// it('with icon', () => {
	// 	const { container } = render(Select, { text: 'With Prop' })
	// 	expect(container.innerHTML).toContain('With Prop')
	// 	expect(container.querySelector('#paragraph').innerHTML).toContain('With Prop')
	// })

	// it('pass props text', () => {
	//     const { container } = render(SvelteText, { text: 'svelte-vitest' })
	//     expect(container.innerHTML).toContain('svelte-vitest')
	// })
	// it('getTextByTestId', () => {
	//     const { getByTestId } = render(SvelteText, { text: 'svelte-vitest' })
	//     const text = getByTestId('text')
	//     expect(text?.innerHTML).toContain('svelte-vitest')
	// })

	// it('click button && getCount', async () => {
	//     const { getByRole, container } = render(SvelteText, { text: 'svelte-vitest' })
	//     const btn = getByRole('button')
	//     expect(container?.innerHTML).toContain('0')

	//     await fireEvent.click(btn)
	//     expect(container?.innerHTML).toContain('1')
	//     await fireEvent.click(btn)

	// })
})
