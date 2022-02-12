<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/popover'

	import Button from '$lib/button/Button.svelte'
	import Popover from '$lib/popover/Popover.svelte'
</script>

<Component {data} {quickstart} {examples}>
	<Popover>
		<svelte:fragment slot="trigger" let:toggleOpened>
			<Button on:click={toggleOpened}>open</Button>
		</svelte:fragment>

		<div slot="content">
			<p style:color="white">Content</p>
		</div>
	</Popover>
</Component>
