<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import RadioButton from '$lib/radio/RadioButton.svelte'
	import RadioGroup from '$lib/radio/RadioGroup.svelte'
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, examples, quickstart } from '../_data/radio-group'

	let stance = 'goofy'
	let park = 'street'
</script>

<Component {data} {quickstart} {examples}>
	<div class="demo-container">
		<RadioGroup label="Stance: {stance}" bind:value={stance}>
			<RadioButton label="Goofy" value="goofy" />
			<RadioButton label="Switch" value="switch" />
		</RadioGroup>
		<RadioGroup label="Park Type: {park}" orientation="vertical" bind:value={park}>
			<RadioButton label="Vert" value="vert" />
			<RadioButton label="Street" value="street" />
		</RadioGroup>
	</div>
</Component>
