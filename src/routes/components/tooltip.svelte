<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/tooltip'

	import Button from '$lib/button/Button.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
</script>

<Component {data} {quickstart} {examples}>
	<Tooltip>
		<Button slot="trigger">Hover Me</Button>
		<span slot="content">Hi There! Iam Content.</span>
	</Tooltip>
</Component>
