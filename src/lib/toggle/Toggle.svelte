<script lang="ts">
	import Switch from '$lib/core/parts/Switch.svelte'

	export let checked = false
	export let disabled = false
	export let name = ''
	export let value = 'on'
</script>

<div part="toggle" data-disabled={disabled}>
	<Switch on:change let:checked {checked} {disabled} {name} {value}>
		<div aria-hidden="true" part="thumb" />
	</Switch>
</div>

<style>
	[part='toggle'] {
		height: calc(var(--st-toggle-size) + 2 * var(--st-toggle-offset));
	}

	:global([part='toggle'] [part='switch']) {
		position: relative;
		width: calc(var(--st-toggle-size) * 2.5 - var(--st-toggle-offset));
		height: calc(var(--st-toggle-size) * 2 * var(--st-toggle-offset));
		background-color: var(--st-colors-dark2);
		border-radius: 9999px;
		border: var(--st-toggle-offset) solid transparent;
	}
	[part='thumb'] {
		transition: all 150ms ease-out;
		width: var(--st-toggle-size);
		height: var(--st-toggle-size);
		background-color: var(--st-colors-dark8);
		border-radius: 9999px;
	}
	:global([part='toggle'] [part='switch'][data-checked='true']) {
		background-color: var(--st-colors-primary5);
	}
	:global([part='toggle'] [part='switch'][data-checked='true'] [part='thumb']) {
		background-color: white;
		transform: translateX(calc(1.5 * var(--st-toggle-size) - 3 * var(--st-toggle-offset)));
	}

	:global([part='toggle'][data-disabled='true'] [part='switch']) {
		background-color: var(--st-colors-dark4);
		cursor: not-allowed;
	}
	:global([part='toggle'][data-disabled='true'] [part='switch'][data-checked='true']) {
		background-color: var(--st-colors-primary8);
	}
</style>
