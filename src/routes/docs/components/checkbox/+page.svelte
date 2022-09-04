<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import { Checkbox } from '$lib'
	import CheckboxGroup from '$lib/checkbox/CheckboxGroup.svelte'
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, examples, quickstart } from '../_data/checkbox'

	let type = ['street']
	let single: string[] = []
</script>

<Component {data} {quickstart} {examples}>
	<div class="demo-container" style:min-width="210px">
		<CheckboxGroup label="Type: {type}" bind:value={type}>
			<Checkbox label="Street" value="street" />
			<Checkbox label="Vert" value="vert" />
		</CheckboxGroup>
		<Checkbox
			bind:group={single}
			label="Forget answer: {single.includes('single') ? 'sure' : 'nope'}"
			value="single"
		/>
	</div>
</Component>
