<script lang="ts">
	import Switch from '$lib/core/parts/Switch.svelte'

	export let checked = false
	export let disabled = false
	export let name = ''
	export let value = 'on'
	export let theme = ''
</script>

<div data-component="toggle" data-disabled={disabled} data-theme={theme} {...$$restProps}>
	<Switch on:change let:checked {checked} {disabled} {name} {value}>
		<div aria-hidden="true" part="thumb" />
	</Switch>
</div>

<style>
	[data-component='toggle'] {
		--st-toggle-size-i: var(--st-toggle-size, 20px);
		--st-toggle-offset-i: var(--st-toggle-offset, 4px);

		height: calc(var(--st-toggle-size-i) + 2 * var(--st-toggle-offset-i));
	}

	:global([data-component='toggle'] [part='switch']) {
		position: relative;
		width: calc(var(--st-toggle-size-i) * 2.5 - var(--st-toggle-offset-i));
		height: calc(var(--st-toggle-size-i) * 2 * var(--st-toggle-offset-i));
		background-color: var(--st-toggle-bg-color, var(--st-colors-dark2));
		border-radius: 9999px;
		border: var(--st-toggle-offset-i) solid transparent;
	}
	[part='thumb'] {
		transition: all 150ms ease-out;
		width: var(--st-toggle-size-i);
		height: var(--st-toggle-size-i);
		background-color: var(--st-toggle-thumb-bg-color, var(--st-colors-dark8));
		border-radius: 9999px;
	}
	:global([data-component='toggle'] [part='switch'][data-checked='true']) {
		background-color: var(--st-toggle-checked-bg-color, var(--st-colors-primary5));
	}
	:global([data-component='toggle'] [part='switch'][data-checked='true'] [part='thumb']) {
		background-color: var(--st-toggle-thumb-checked-bg-color, var(--st-colors-light3));
		transform: translateX(calc(1.5 * var(--st-toggle-size-i) - 3 * var(--st-toggle-offset-i)));
	}

	:global([data-component='toggle'][data-disabled='true'] [part='switch']) {
		cursor: not-allowed;
		opacity: var(--st-field-disabled-opacity);
	}

	:global([part='switch']:focus) {
		outline: none;
	}
	:global([part='switch']:focus-visible) {
		outline: var(--st-outline-width) solid var(--st-outline-color);
	}
</style>
