/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cleanup, render, fireEvent } from '@testing-library/svelte'
//@ts-ignore
import Select from '../lib/select/Select.svelte'
import { describe, it, expect, afterEach } from 'vitest'

describe('Select.svelte', () => {
	afterEach(() => cleanup())

	const itemsMap = [
		{ id: '1', label: 'Label 1' },
		{ id: '2', label: 'Label 2' }
	]

	it('Mounted', () => {
		const { container } = render(Select)
		expect(container).toBeTruthy()
	})

	it('get Select', async () => {
		const { container } = render(Select, { placeholder: 'test' })
		expect(container.querySelector('[part="value"]').innerHTML).toContain('test')
	})

	it('render items from map', async () => {
		const { container } = render(Select, {
			placeholder: 'items',
			items: itemsMap
		})

		const btn = container.querySelector('[part="value"]')

		expect(container.querySelector(`[data-component="listbox"]`)).toBeFalsy()

		await fireEvent.click(btn)

		const listbox = container.querySelector(`[data-component="listbox"]`)

		expect(listbox).toBeTruthy()

		expect(listbox.querySelectorAll('[part="item"]').length).toBe(itemsMap.length)
	})

	it('select value from listbox', async () => {
		const { container } = render(Select, {
			placeholder: 'items',
			items: itemsMap
		})

		const btn = container.querySelector('[part="value"]')

		await fireEvent.click(btn)

		expect(container.querySelector(`[data-component="listbox"]`)).toBeTruthy()

		const listbox = container.querySelector(`[data-component="listbox"]`)

		const firstItem = listbox.querySelectorAll('[part="item"]')[0]

		await fireEvent.click(firstItem)

		expect(container.querySelector(`[data-component="listbox"]`)).toBeFalsy()

		expect(container.querySelector('[part="selected"]').innerHTML).toContain(itemsMap[0].label)
	})

	it('selected value from prop', async () => {
		const { container } = render(Select, {
			placeholder: 'items',
			items: itemsMap,
			value: itemsMap[1]
		})

		expect(container.querySelector(`[data-component="listbox"]`)).toBeFalsy()

		expect(container.querySelector('[part="selected"]').innerHTML).toContain(itemsMap[1].label)
	})

	it('searchable', async () => {
		//TODO:
	})
	it('groupable', async () => {
		//TODO:
	})
	it('multiple', async () => {
		//TODO:
	})
	it('closeOnSelect', async () => {
		//TODO:
	})
	it('filterBy', async () => {
		//TODO:
	})
	it('taggable', async () => {
		//TODO:
	})
})
