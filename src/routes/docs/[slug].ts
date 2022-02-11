import type { RequestHandler } from '@sveltejs/kit'
import fs from 'fs'
// import { marked } from 'marked'
import MD from 'markdown-it'
import { Parser, HtmlRenderer } from 'commonmark'

const md = new MD()

export const get: RequestHandler = async ({ params }) => {
	const { slug } = params

	let data = {}
	let examples = {}
	let quickstart = {}
	try {
		examples = md.render(fs.readFileSync(`documentation/docs/${slug}/examples.md`, 'utf8'))
		quickstart = md.render(fs.readFileSync(`documentation/docs/${slug}/quickstart.md`, 'utf8'))
		data = JSON.parse(fs.readFileSync(`documentation/docs/${slug}/data.json`, 'utf8'))

		const reader = new Parser()
		const writer = new HtmlRenderer()
		const parsed = reader.parse(fs.readFileSync(`documentation/docs/${slug}/quickstart.md`, 'utf8')) // parsed is a 'Node' tree
		// transform parsed if you like...
		const qs = writer.render(parsed) // result is a String

		// console.log(quickstart)
		console.log(parsed)
	} catch (error) {
		console.log(error)
	}

	// console.log({ data })

	return {
		body: {
			examples,
			data,
			quickstart
		}
	}
}
