<script lang="ts">
	import Button from '$lib/button/Button.svelte'
	import Toggle from '$lib/toggle/Toggle.svelte'
	import Select from '$lib/select/Select.svelte'

	export function enhance(
		form: HTMLFormElement,
		{
			pending,
			error,
			result
		}: {
			pending?: (data: FormData, form: HTMLFormElement) => void
			error?: (res: Response | null, error: Error | null, form: HTMLFormElement) => void
			result: (res: Response, form: HTMLFormElement) => void
		}
	): { destroy: () => void } {
		let current_token: unknown

		async function handle_submit(e: Event) {
			const token = (current_token = {})

			e.preventDefault()

			const body = new FormData(form)

			if (pending) pending(body, form)

			try {
				const res = await fetch(form.action, {
					method: form.method,
					headers: {
						accept: 'application/json'
					},
					body
				})

				if (token !== current_token) return

				if (res.ok) {
					result(res, form)
				} else if (error) {
					error(res, null, form)
				} else {
					console.error(await res.text())
				}
			} catch (e: any) {
				if (error) {
					error(null, e, form)
				} else {
					throw e
				}
			}
		}

		form.addEventListener('submit', handle_submit)

		return {
			destroy() {
				form.removeEventListener('submit', handle_submit)
			}
		}
	}

	const colors = {
		light: 10,
		dark: 10,
		gray: 10,
		primary: 5
	}
</script>

<form
	use:enhance={{
		result: async (res, form) => {
			const created = await res.json()
			console.log(created)

			form.reset()
		}
	}}
	action="/api/test"
	method="post"
	class="rounded-lg p-8 flex flex-col gap-4"
>
	<h2 class="!m-0">Form Example</h2>
	<div class="flex gap-4 flex-wrap">
		<Select
			label="Label"
			helper="This text might help you"
			name="val1"
			placeholder="Select"
			items={[
				{ id: '1', label: 'Value' },
				{ id: '2', label: 'Value 2' },
				{ id: '3', label: 'Value 3' }
			]}
		/>
		<Select name="val2" placeholder="Select" value="1" items={[{ id: '1', label: 'Value' }]}>
			<span slot="label">label</span>
			<span slot="helper">helper</span>
		</Select>
		<Select name="val3" disabled placeholder="Select" items={[{ id: '1', label: 'Value' }]} />
		<Select
			name="val4"
			disabled
			placeholder="Select"
			value="1"
			items={[{ id: '1', label: 'Value' }]}
		/>
	</div>
	<div class="flex gap-4">
		<Toggle
			on:change={(e) => {
				console.log(e)
			}}
			name="toggle1"
			value="on"
		/>
		<Toggle name="toggle2" checked value="on" />
		<Toggle name="toggle3" disabled value="on" />
		<Toggle name="toggle4" checked disabled value="on" />
	</div>
	<div class="flex gap-4" />
	<div class="flex gap-4">
		<Button theme="primary" type="submit">Submit</Button>
		<Button theme="secondary" type="reset">Reset</Button>
		<Button theme="tertiary">Submit</Button>
		<Button theme="primary" disabled type="submit">Submit</Button>
		<Button theme="secondary" disabled>Submit</Button>
		<Button theme="tertiary" disabled>Submit</Button>
	</div>
</form>

<!-- <div class="flex flex-col gap-4">
	{#each Object.keys(colors) as color}
		<div class="flex flex-col gap-2">
			<span class="text-gray-200">{color}</span>
			<div class="flex gap-2">
				{#each [...Array(colors[color]).keys()] as num}
					<div class="flex flex-col items-center">
						<div class="w-7 h-7 rounded" style:background={`var(--st-colors-${color}${num + 1})`} />
						<span class="text-gray-500">{num + 1}</span>
					</div>
				{/each}
			</div>
		</div>
	{/each}
</div> -->
<style>
	form {
		background: var(--st-secondary-bg-color);
		/* background: var(--st-colors-gray2); */
		border: 1px solid var(--st-border-color);
	}
</style>
