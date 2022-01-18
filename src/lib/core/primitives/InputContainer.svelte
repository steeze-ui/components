<script lang="ts">
	export let ref = null
</script>

<div on:click on:focus bind:this={ref} part="input-field" {...$$restProps}>
	<slot />
</div>

<style>
	[part='input-field'] {
		display: flex;
		position: relative;
		overflow: hidden;
		outline: none;
		border: var(--st-text-field-border-width) solid var(--st-text-field-border-color);
		height: var(--st-text-field-size);
		border-radius: var(--st-text-field-border-radius);
		background-color: var(--st-text-field-bg-color);
	}

	[part='input-field']:focus {
		outline: none;
	}
	[part='input-field']:focus-visible {
		outline: var(--st-outline-width) solid var(--st-outline-color);
	}
</style>
