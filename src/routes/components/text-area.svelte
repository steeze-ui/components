<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, quickstart, examples } from './_data/text-area'

	import Tabs from '$lib/tabs/Tabs.svelte'
	import TextArea from '$lib/fields/TextArea.svelte'

	let value = 'This is awesome!'

	const maxlength = '100'
	$: len = value.length
</script>

<Component {data} {quickstart} {examples}>
	<TextArea label="Comment" helper="{len}/{maxlength}" {maxlength} bind:value />
</Component>
