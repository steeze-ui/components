<script lang="ts">
	export let disabled = false
	export let ref = null
</script>

<div data-disabled={disabled} on:click on:focus bind:this={ref} part="input-field" {...$$restProps}>
	<slot />
</div>

<style>
	[part='input-field'] {
		display: flex;
		position: relative;
		overflow: hidden;
		outline: none;
		border: var(--st-field-border-width) solid var(--st-field-border-color);
		height: var(--st-field-height);
		border-radius: var(--st-field-border-radius);
		background-color: var(--st-field-bg-color);
		padding: var(--st-field-padding);
		align-items: center;
	}

	[part='input-field'][data-disabled='true'] {
		border-style: dashed;
		overflow: hidden;
		cursor: not-allowed;
		opacity: 0.7;
	}
	[part='input-field'][data-disabled='true']:hover {
		background-color: var(--st-field-bg-color);
	}

	[part='input-field']:focus {
		outline: none;
	}
	[part='input-field']:focus-visible,
	[data-focused='true']:focus-visible {
		outline: var(--st-outline-width) solid var(--st-outline-color);
	}
</style>
