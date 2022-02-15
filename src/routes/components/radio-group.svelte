<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Flex from '$lib/flex/Flex.svelte'
	import RadioButton from '$lib/radio/RadioButton.svelte'
	import RadioGroup from '$lib/radio/RadioGroup.svelte'
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/radio-group'

	let stance = 'goofy'
	let park = 'street'
</script>

<Component {data} {quickstart} {examples}>
	<div part="option-group-demo" class="p-4 rounded-lg container">
		<RadioGroup label="Stance">
			<RadioButton bind:group={stance} label="Goofy" value="goofy" />
			<RadioButton bind:group={stance} label="Switch" value="switch" />
		</RadioGroup>
		<RadioGroup label="Park Type" orientation="vertical">
			<RadioButton bind:group={park} label="Vert" value="vert" />
			<RadioButton bind:group={park} label="Street" value="street" />
		</RadioGroup>
	</div>
</Component>

<style>
	[part='option-group-demo'] {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background: hsl(240, 21%, 11%, 0.8);
		width: min-content;
	}

	:global(.light [part='option-group-demo']) {
		background: hsl(240, 18%, 88%, 0.8);
		width: min-content;
	}
</style>
