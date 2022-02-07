export const post: unknown = async ({ request }) => {
	const data = await request.formData()
	data.forEach((e: unknown, i: number) => {
		console.log(`${i}: ${e}`)
	})

	return { status: 200, body: { id: 1 } }
}
