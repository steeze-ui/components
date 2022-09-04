<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from '../_data/tooltip'

	import Button from '$lib/button/Button.svelte'
	import Tooltip from '$lib/tooltip/Tooltip.svelte'
</script>

<Component {data} {quickstart} {examples}>
	<Tooltip>
		<Button slot="trigger" aria-label="hover demo trigger" style="user-select: none;"
			>Hover me</Button
		>
		<p slot="content" class="p-1">Stop hovering and Iam gone!</p>
	</Tooltip>
</Component>
