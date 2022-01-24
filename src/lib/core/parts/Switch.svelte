<script lang="ts">
	import { browser } from '$app/env'
	import { createEventDispatcher, onMount } from 'svelte'

	import { getId } from '../utils/id'

	export let checked = false
	export let disabled = false
	export let name = ''
	export let value = 'on'

	const id = getId()

	let input: HTMLInputElement
	const dispatch = createEventDispatcher()

	function onToggle() {
		if (!disabled) {
			checked = !checked
			dispatch('change', { checked })
		}
	}

	$: {
		if (input) {
			checked ? input.setAttribute('checked', '') : input.removeAttribute('checked')
		}
	}
</script>

<button
	on:click={onToggle}
	type="button"
	role="switch"
	part="switch"
	{value}
	{id}
	tabindex="0"
	style={$$props.style}
	aria-checked={checked}
	aria-disabled={disabled}
	data-checked={checked}
	data-disabled={disabled}
>
	<slot {checked} {disabled} />
</button>
<input
	type="checkbox"
	bind:checked
	bind:this={input}
	aria-hidden="true"
	tabindex="-1"
	{name}
	{value}
/>

<style>
	input {
		transform: translateX(-100%);
		position: absolute;
		pointer-events: none;
		opacity: 0;
		margin: 0px;
		width: 42px;
		height: 25px;
	}
</style>
