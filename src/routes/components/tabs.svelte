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
	<Tabs items={[{ title: 'Tab 1' }, { title: 'Tab 2' }, { title: 'Tab 3' }]} bind:selected />
	{selected}
</Component>
