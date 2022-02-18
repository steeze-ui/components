<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import TextArea from '$lib/fields/TextArea.svelte'
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, examples, quickstart } from './_data/text-area'

	let value = 'This is awesome!'

	const maxlength = '100'
	$: len = value.length
</script>

<Component {data} {quickstart} {examples}>
	<div class="demo-container">
		<TextArea label="Comment" width="14rem" helper="{len}/{maxlength}" {maxlength} bind:value />
	</div>
</Component>
