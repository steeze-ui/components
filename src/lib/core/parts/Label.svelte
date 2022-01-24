<script lang="ts">
	let htmlFor
	export { htmlFor as for }
</script>

<label on:click for={htmlFor} {...$$restProps}>
	<slot />
</label>

<style>
	label {
		font-weight: var(--st-label-font-weight);
		font-size: var(--st-label-font-size);
		color: var(--st-label-color);
	}
</style>
