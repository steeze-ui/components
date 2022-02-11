<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Tabs from '$lib/tabs/Tabs.svelte'
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/text-area'
</script>

<Component {data} {quickstart} {examples}>
	<Tabs />
</Component>
