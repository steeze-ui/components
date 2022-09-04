<script context="module">
	export const prerender = true
</script>

<script lang="ts">
	import { Toggle } from '$lib'
	import Button from '$lib/button/Button.svelte'
	import Label from '$lib/core/parts/Label.svelte'
	import Dialog from '$lib/dialog/Dialog.svelte'
	import Component from '$lib/_internal/docs/Component.svelte'
	import { data, examples, quickstart } from '../_data/dialog'

	let opened = false
	let draggable = false
	let resizable = false
	let unclosable = false
</script>

<Component {data} {quickstart} {examples}>
	<Button on:click={() => (opened = true)}>Open Dialog</Button>
	<Dialog bind:opened {draggable} {resizable} {unclosable}>
		<div class="prose st-small flex gap-2 flex-col">
			<h2 class="">Options</h2>
			<div class="flex gap-4 items-center">
				<Label for="draggable">Draggable</Label>
				<Toggle id="draggable" bind:checked={draggable} />
			</div>
			<div class="flex gap-4 items-center">
				<Label for="resizable">Resizable</Label>
				<Toggle id="resizable" bind:checked={resizable} />
			</div>
			<div class="flex gap-4 items-center">
				<Label for="unclosable">Unclosable on outside click</Label>
				<Toggle id="unclosable" bind:checked={unclosable} />
			</div>
		</div>
	</Dialog>
</Component>
