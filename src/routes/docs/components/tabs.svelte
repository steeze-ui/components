<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/tabs'

	import Tabs from '$lib/tabs/Tabs.svelte'

	let selected = 0
</script>

<Component {data} {quickstart} {examples}>
	<div class="demo-container">
		<Tabs
			items={[{ title: 'Tab 1' }, { title: 'Tab 2' }, { title: 'Tab 3' }]}
			bind:selected
			theme="line"
		/>
		<p>
			Content: {selected + 1}
		</p>
	</div>
</Component>

<style>
	p {
		margin: 0;
	}
</style>
