<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/text-area'

	import Tabs from '$lib/tabs/Tabs.svelte'
</script>

<Component {data} {quickstart} {examples}>
	<Tabs />
</Component>
