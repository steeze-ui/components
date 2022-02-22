/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cleanup, render, fireEvent } from '@testing-library/svelte'
//@ts-ignore
import Select from '../lib/select/Select.svelte'
import { describe, it, expect, afterEach } from 'vitest'

describe('Select.svelte', () => {
	afterEach(() => cleanup())

	const itemsMap = [
		{ id: '1', label: 'Label 1' },
		{ id: '2', label: 'Label 2' },
		{ id: '3', label: 'Label 3' },
		{ id: '4', label: 'Label 4' }
	]

	it('Mounted', () => {
		const { container } = render(Select)
		expect(container).toBeTruthy()
	})

	it('get Select', async () => {
		const { container } = render(Select, { placeholder: 'test' })
		expect(container.querySelector('[part="value"]').innerHTML).toContain('test')
	})

	it('render items ', async () => {
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
		const { container } = render(Select, {
			placeholder: 'items',
			items: itemsMap,
			searchable: true
		})

		const btn = container.querySelector('[part="value"]')
		await fireEvent.click(btn)

		const input = container.querySelector('input')
		await fireEvent.input(input, { target: { value: '1' } })

		expect(input.value).toBe('1')

		const listbox = container.querySelector(`[data-component="listbox"]`)
		const items = listbox.querySelectorAll('[part="item"]')
		console.log(items)

		expect(items.length).toBe(1)
		expect(items[0].innerHTML).toContain(itemsMap[0].label)
	})
	it('groupable', async () => {
		//TODO:
	})
	it('multiple', async () => {
		//TODO:
	})
	it('retainOnSelect=true', async () => {
		//TODO:
	})
	it('filterBy', async () => {
		//TODO:
	})
	it('taggable', async () => {
		//TODO:
	})
})
