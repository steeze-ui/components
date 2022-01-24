import type { RequestHandler } from '@sveltejs/kit'

export const post: RequestHandler<unknown> = async ({ request }) => {
	const data = await request.formData()
	data.forEach((e, i) => {
		console.log(`${i}: ${e}`)
	})

	return { status: 200, body: { id: 1 } }
}
