<script lang="ts" context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/toggle'

	import Toggle from '$lib/toggle/Toggle.svelte'
</script>

<Component {data} {quickstart} {examples}>
	<Toggle checked />
</Component>
